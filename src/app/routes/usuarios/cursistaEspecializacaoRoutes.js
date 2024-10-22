import { Router } from "express"
import cursistaEspecializacaoController from "../../controllers/usuarios/cursistaEspecializacaoController"
import AuthMiddleware from '../../middlewares/auth'

const router = new Router()

router.post('/', cursistaEspecializacaoController.post)

router.get('/', cursistaEspecializacaoController.get)

router.post('/inserir_material', AuthMiddleware, cursistaEspecializacaoController.postPracticalReport)

// router.get('/meus_materiais', AuthMiddleware, cursistaEspecializacaoController.getMeusMateriais)

// router.get('/material/:nome', AuthMiddleware, cursistaEspecializacaoController.getMaterial)

// router.get('/materiais_nao_visualizados', AuthMiddleware, cursistaEspecializacaoController.getMaterialNaoVisualizado)

router.post('/participar_turma/:nome_turma', AuthMiddleware, cursistaEspecializacaoController.postCursaTurma)

router.get('/minhas_turmas', AuthMiddleware, cursistaEspecializacaoController.getMinhasTurmas)

router.post('/interesse_nas_disciplinas', AuthMiddleware, cursistaEspecializacaoController.postInteresseNaDisciplina)

export default router