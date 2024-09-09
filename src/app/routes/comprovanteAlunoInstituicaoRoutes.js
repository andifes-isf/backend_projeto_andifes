import { Router } from "express"
import AuthMiddleware from '../../app/middlewares/auth'
import comprovanteAlunoInstituicaoController from "../controllers/usuario_pertence_instituicao/comprovanteAlunoInstituicaoController"

const router = new Router()

router.post('/', AuthMiddleware, comprovanteAlunoInstituicaoController.post)

export default router