import { Router } from "express"
import alunoEstrangeiroController from "../controllers/alunoEstrangeiroController"

const router = new Router()

router.post('/', alunoEstrangeiroController.post)

router.get('/', alunoEstrangeiroController.get)

export default router