import { Router } from "express"
import AuthMiddleware from '../../middlewares/auth'
import alunoDeInstituicaoController from "../../controllers/usuarios/alunoDeInstituicaoController"

const router = new Router()

router.post('/', alunoDeInstituicaoController.post)

router.get('/', alunoDeInstituicaoController.get)

router.post('/adicionar_instituicao', AuthMiddleware, alunoDeInstituicaoController.postInstituicao)

router.get('/visualizar_minhas_instituicoes', AuthMiddleware, alunoDeInstituicaoController.getMinhasInstituicoes)

router.get('/visualizar_instituicao_atual', AuthMiddleware, alunoDeInstituicaoController.getInstituicaoAtual)

export default router