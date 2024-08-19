import { Router } from "express"
import alunoGraduacaoController from "../controllers/alunoGraduacaoController"

const router = new Router()

router.post('/', alunoGraduacaoController.post)

router.get('/', alunoGraduacaoController.get)

export default router