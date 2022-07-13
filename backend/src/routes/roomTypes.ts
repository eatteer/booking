import { Router } from 'express'
import {
  createOne,
  findAll,
  findById,
  updateById,
  addDatesBooked,
  removeById
} from '../controllers/roomTypes'
import { Roles } from '../models/Role'
import verifyRole from '../middlewares/verifyRole'
import verifyToken from '../middlewares/verifyToken'

const router = Router()

router.post('/', createOne)
router.get('/', findAll)
router.get('/:id', findById)
router.put('/:id', updateById)
router.put('/add-dates-booked/:roomNumberId', addDatesBooked)
router.delete('/:roomId/:hotelId', removeById)

export default router