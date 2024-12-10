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

router.get('/my_classes', AuthMiddleware, cursistaEspecializacaoController.getMinhasTurmas)

router.post('/interest_in_discipline', AuthMiddleware, cursistaEspecializacaoController.postInteresseNaDisciplina)

router.post('/feedback', AuthMiddleware, cursistaEspecializacaoController.postReclamation)

router.post('/guidance_report', AuthMiddleware, cursistaEspecializacaoController.postGuidanceReport)

router.get('/guidance_report', AuthMiddleware, cursistaEspecializacaoController.getGuidanceReport)

export default router