import { Router } from "express"
import AuthMiddleware from '../../middlewares/auth'
import ProfessorIsFController from "./isfTeacherController"

const controller = new ProfessorIsFController()
const router = new Router()

router.get('/', controller.get)

router.post('/proeficiency', AuthMiddleware, controller.postProeficiencia)

router.get('/my_proeficiency', AuthMiddleware, controller.getMinhaProeficiencia)

router.post('/institution/:institutionId', AuthMiddleware, controller.postInstituicao)

router.get('/my_institutions', AuthMiddleware, controller.getMinhasInstituicoes)

router.get('/current_institution', AuthMiddleware, controller.getInstituicaoAtual)

export default router
