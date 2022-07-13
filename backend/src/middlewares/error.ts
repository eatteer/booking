import { ErrorRequestHandler } from 'express'

class HttpError extends Error {
  statusCode = 500
  constructor() {
    super()
    this.message = 'Something went wrong'
  }
}

export const createHttpError = (statusCode: number, message: string) => {
  const error = new HttpError()
  error.statusCode = statusCode
  error.message = message
  return error
}

const handler: ErrorRequestHandler = (err, req, res, next) => {
  /* Default values because only custom errors have statusCode and message */
  /* For example, mongoose errors don't have them */
  const statusCode = err.statusCode || 500
  const message = err.message || 'Something went wrong'
  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
    stack: err.stack
  })
}

export default handler