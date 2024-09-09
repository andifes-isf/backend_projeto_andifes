import { Router } from "express"
import AuthMiddleware from '../../app/middlewares/auth'
import comprovanteAlunoInstituicaoController from "../controllers/comprovanteAlunoInstituicaoController"

const router = new Router()

router.post('/', AuthMiddleware, comprovanteAlunoInstituicaoController.post)

export default router