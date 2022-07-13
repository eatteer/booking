import { Router } from 'express'
import { createOne } from '../controllers/rooms'

const router = Router()

router.post('/', createOne)

export default router