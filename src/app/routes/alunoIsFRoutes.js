import { Router } from "express"
import alunoIsFController from "../controllers/alunoIsFController"

const router = new Router()

router.post('/', alunoIsFController.post)

router.get('/', alunoIsFController.get)

export default router