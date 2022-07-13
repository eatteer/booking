import { AccessTokenPayload } from '../../src/middlewares/verifyToken'

declare global {
  namespace Express {
    interface Request {
      accessTokenPayload?: AccessTokenPayload;
    }
  }
}