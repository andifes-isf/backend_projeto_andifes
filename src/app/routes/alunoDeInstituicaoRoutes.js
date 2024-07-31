import { Router } from "express"
import alunoDeInstituicaoController from "../controllers/alunoDeInstituicaoController"

const router = new Router()

router.post('/', alunoDeInstituicaoController.post)

router.get('/', alunoDeInstituicaoController.get)

export default router