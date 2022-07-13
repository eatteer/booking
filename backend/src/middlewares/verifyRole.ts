import { NextFunction, Request, Response } from "express";
import { createHttpError } from "./error";
import { Roles } from "../models/Role";
import User from '../models/User'

const verifyRole = (requiredRoles: Roles[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const { _id: id } = req.accessTokenPayload!
    try {
      const foundUser = await User.findById(id).populate('roles')
      const userRoles = foundUser!.roles!.map(role => role.name)

      const isAuthorized = requiredRoles.some((role) => userRoles!.includes(role))

      if (!isAuthorized) {
        const error = createHttpError(401, 'Unauthorized')
        throw error
      }

      next()
    } catch (error) {
      next(error)
    }
  }
}

export default verifyRole