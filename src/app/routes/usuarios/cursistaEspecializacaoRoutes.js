import { Router } from "express"
import cursistaEspecializacaoController from "../../controllers/usuarios/cursistaEspecializacaoController"
import AuthMiddleware from '../../middlewares/auth'

const router = new Router()

router.post('/', cursistaEspecializacaoController.post)

router.get('/', cursistaEspecializacaoController.get)

router.post('/practical_report', AuthMiddleware, cursistaEspecializacaoController.postPracticalReport)

router.get('/my_practical_reports', AuthMiddleware, cursistaEspecializacaoController.getMyMaterials)

router.get('/practical_report/:name', AuthMiddleware, cursistaEspecializacaoController.getMaterial)

router.get('/practical_report_not_viewed', AuthMiddleware, cursistaEspecializacaoController.getNotViewedMaterials)

router.post('/class/:name', AuthMiddleware, cursistaEspecializacaoController.postCursaTurma)

router.get('/class', AuthMiddleware, cursistaEspecializacaoController.getMinhasTurmas)

router.post('/interest_in_disciplina', AuthMiddleware, cursistaEspecializacaoController.postInteresseNaDisciplina)

router.post('/feedback', AuthMiddleware, cursistaEspecializacaoController.postReclamation)

export default router