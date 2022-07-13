import { Router } from 'express'
import { createOne, findAll } from '../controllers/reservations'
import verifyRole from '../middlewares/verifyRole'
import verifyToken from '../middlewares/verifyToken'
import { Roles } from '../models/Role'

const router = Router()

router.get('/', findAll)
router.post('/', verifyToken, verifyRole([Roles.Client]), createOne)

export default router