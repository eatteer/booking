import { RequestHandler } from "express"
import jwt from 'jsonwebtoken'
import { createHttpError } from "./error"

export type AccessTokenPayload = {
  _id: string
}

const verifyToken: RequestHandler = (req, res, next) => {
  const authorizationHeader = req.headers.authorization

  if (!authorizationHeader) {
    const error = createHttpError(401, 'Unauthorized')
    return next(error)
  }

  /* Extract accessToken from authorization header
  Bearer eyJhbGciOiJIUzI1NiIsIn
  ["Bearer" , "eyJhbGciOiJIUzI1NiIsIn"] */
  const accessToken = authorizationHeader.split(' ')[1]

  const JWT_SECRET = process.env.JWT_SECRET as string
  try {
    const accessTokenPayload = jwt.verify(accessToken, JWT_SECRET) as AccessTokenPayload
    req.accessTokenPayload = accessTokenPayload
    next()
  } catch (error) {
    next(error)
  }
}

export default verifyToken