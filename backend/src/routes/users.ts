import { Router } from 'express'
import { findAll, findById, updateById, removeById } from '../controllers/users'
import { Roles } from '../models/Role'
import verifyRole from '../middlewares/verifyRole'
import verifyToken from '../middlewares/verifyToken'

const router = Router()

router.get('/', verifyToken, verifyRole([Roles.Admin]), findAll)
router.get('/:id', verifyToken, verifyRole([Roles.Admin, Roles.Client]), findById)
router.put('/:id', verifyToken, verifyRole([Roles.Client]), updateById)
router.delete('/:id', verifyToken, verifyRole([Roles.Client]), removeById)

export default router