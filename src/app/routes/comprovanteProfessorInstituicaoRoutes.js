import { Router } from "express"
import AuthMiddleware from '../../app/middlewares/auth'
import comprovanteProfessorInstituicaoController from "../controllers/usuario_pertence_instituicao/comprovanteProfessorInstituicaoController"

const router = new Router()

router.post('/', AuthMiddleware, comprovanteProfessorInstituicaoController.post)

export default router