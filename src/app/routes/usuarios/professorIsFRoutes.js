import { Router } from "express"
import professorIsFController from "../../controllers/usuarios/professorIsFController"
import AuthMiddleware from '../../middlewares/auth'

const router = new Router()

router.get('/', professorIsFController.get)

router.post('/adicionar_proeficiencia', AuthMiddleware, professorIsFController.postProeficiencia)

router.get('/visualizar_minha_proeficiencia', AuthMiddleware, professorIsFController.getMinhaProeficiencia)

router.post('/adicionar_instituicao', AuthMiddleware, professorIsFController.postInstituicao)

router.get('/visualizar_minhas_instituicoes', AuthMiddleware, professorIsFController.getMinhasInstituicoes)

router.get('/visualizar_instituicao_atual', AuthMiddleware, professorIsFController.getInstituicaoAtual)

export default router
