import { Router } from 'express'
import {
  createOne,
  findByFilters,
  findById,
  findRoomsStatus,
  findFeatured,
  countByCity,
  countByType,
  updateById,
  removeById
} from '../controllers/stays'
import { Roles } from '../models/Role'
import verifyRole from '../middlewares/verifyRole'
import verifyToken from '../middlewares/verifyToken'

const router = Router()

router.post('/', createOne)
router.get('/', findByFilters)
router.post('/:id/rooms/status', findRoomsStatus)
router.get('/featured', findFeatured)
router.get('/count-by-city', countByCity)
router.get('/count-by-type', countByType)
router.get('/:id', findById)
router.put('/:id', verifyToken, verifyRole([Roles.Admin]), updateById)
router.delete('/:id', verifyToken, verifyRole([Roles.Admin]), removeById)

export default router