import { Router } from "express"
import AuthMiddleware from '../../middlewares/auth'
import ProfessorIsFController from "../../controllers/usuarios/professorIsFController"

const controller = new ProfessorIsFController()
const router = new Router()

router.get('/', controller.get)

router.post('/adicionar_proeficiencia', AuthMiddleware, controller.postProeficiencia)

router.get('/visualizar_minha_proeficiencia', AuthMiddleware, controller.getMinhaProeficiencia)

router.post('/adicionar_instituicao/:idInstituicao', AuthMiddleware, controller.postInstituicao)

router.get('/visualizar_minhas_instituicoes', AuthMiddleware, controller.getMinhasInstituicoes)

router.get('/visualizar_instituicao_atual', AuthMiddleware, controller.getInstituicaoAtual)

export default router
