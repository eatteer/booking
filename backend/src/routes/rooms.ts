import { Router } from 'express'
import { createOne } from '../controllers/rooms'
import { Roles } from '../models/Role'
import verifyToken from '../middlewares/verifyToken'
import verifyRole from '../middlewares/verifyRole'

const router = Router()

router.post('/', verifyToken, verifyRole([Roles.Admin]), createOne)

export default router