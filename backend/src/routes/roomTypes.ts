import { Router } from 'express'
import {
  createOne,
  findAll,
  findById,
  updateById,
  removeById
} from '../controllers/roomTypes'
import { Roles } from '../models/Role'
import verifyRole from '../middlewares/verifyRole'
import verifyToken from '../middlewares/verifyToken'

const router = Router()

router.post('/', verifyToken, verifyRole([Roles.Admin]), createOne)
router.get('/', verifyToken, verifyRole([Roles.Admin]), findAll)
router.get('/:id', verifyToken, verifyRole([Roles.Admin]), findById)
router.put('/:id', verifyToken, verifyRole([Roles.Admin]), updateById)
router.delete('/:roomId/:hotelId', verifyToken, verifyRole([Roles.Admin]), removeById)

export default router