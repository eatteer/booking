import { RequestHandler } from 'express'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import Role, { Roles } from '../models/Role'
import User from '../models/User'
import { AccessTokenPayload } from '../middlewares/verifyToken'
import { createHttpError } from '../middlewares/error'

const generateHash = (password: string) => {
  const salt = bcrypt.genSaltSync(10)
  const hash = bcrypt.hashSync(password, salt)
  return hash
}

/* Try to create a user with the same username or email throws an error */
export const createClient: RequestHandler = async (req, res, next) => {
  const userData = req.body

  try {
    /* Hard-coded client role */
    const role = await Role.findOne({ name: Roles.Client })

    /* Generate hash for password */
    const hash = generateHash(userData.password)

    /* Create and save user */
    const userModel = new User({ ...userData, password: hash, roles: [role!._id] })
    const savedUser = await userModel.save()

    res.status(201).json(savedUser)
  } catch (error) {
    next(error)
  }
}

export const createUser: RequestHandler = async (req, res, next) => {
  const userData = req.body

  try {
    /* Get role ids */
    const roleIds = await Promise.all(userData.roles.map(async (roleName: string) => {
      const role = await Role.findOne({ name: roleName })
      if (!role) {
        const error = createHttpError(404, `Role "${roleName}" not found`)
        throw error
      }
      return role._id
    }))

    /* Generate hash for password */
    const hash = generateHash(userData.password)

    /* Create and save user */
    const userModel = new User({ ...userData, password: hash, roles: [...roleIds] })
    const savedUser = await userModel.save()

    res.status(201).json(savedUser)
  } catch (error) {
    next(error)
  }
}

export const loginUser: RequestHandler = async (req, res, next) => {
  const userData = req.body
  try {
    const foundUser = await User.findOne({ username: userData.username })
    if (!foundUser) {
      const error = createHttpError(404, 'Not found')
      throw error
    }

    const isMatch = await bcrypt.compare(userData.password, foundUser.password)
    if (!isMatch) {
      const error = createHttpError(400, 'Bad request')
      throw error
    }

    const payload: AccessTokenPayload = {
      _id: foundUser._id.toString()
    }

    const JWT_SECRET = process.env.JWT_SECRET as string
    const accessToken = jwt.sign(payload, JWT_SECRET)

    res.status(200).json({ accessToken })
  } catch (error) {
    next(error)
  }
}