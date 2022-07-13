import { Router } from "express";
import { createOne } from "../controllers/roles";
import { Roles } from "../models/Role";
import verifyRole from "../middlewares/verifyRole";
import verifyToken from "../middlewares/verifyToken";

const router = Router()

router.post('/', createOne)

export default router