import { Router } from 'express'
import { createUser, createClient, loginUser } from '../controllers/auth'
import { Roles } from '../models/Role'
import verifyRole from '../middlewares/verifyRole'
import verifyToken from '../middlewares/verifyToken'

const router = Router()

router.post('/login', loginUser)
router.post('/register/client', createClient) /* Used by client frontend. Has client role hard-coded */
router.post('/register', createUser)

export default router