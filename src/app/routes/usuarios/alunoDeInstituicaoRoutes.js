import { Router } from "express"
import AuthMiddleware from '../../middlewares/auth'
import alunoDeInstituicaoController from "../../controllers/usuarios/alunoDeInstituicaoController"

const router = new Router()

router.post('/', alunoDeInstituicaoController.post)

router.get('/', alunoDeInstituicaoController.get)

router.post('/institution/:institutionId', AuthMiddleware, alunoDeInstituicaoController.postInstituicao)

router.get('/my_institutions', AuthMiddleware, alunoDeInstituicaoController.getMinhasInstituicoes)

router.get('/current_institution', AuthMiddleware, alunoDeInstituicaoController.getInstituicaoAtual)

export default router