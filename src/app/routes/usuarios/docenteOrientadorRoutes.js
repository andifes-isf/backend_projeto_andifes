import { Router } from "express"
import docenteOrientadorController from "../../controllers/usuarios/docenteOrientadorController"
import AuthMiddleware from '../../middlewares/auth'

const router = new Router()

router.post('/', docenteOrientadorController.post)

router.get('/', docenteOrientadorController.get)

router.post('/mentee', AuthMiddleware, docenteOrientadorController.postOrientado)

router.delete('/mentee', AuthMiddleware, docenteOrientadorController.deleteOrientado)

router.get('/mentee_practical_report', AuthMiddleware, docenteOrientadorController.getMenteesMaterials)

router.get('/practical_reports_not_evaluated', AuthMiddleware, docenteOrientadorController.getNotEvaluatedMaterials)

router.get('/practical_report_not_validated', AuthMiddleware, docenteOrientadorController.getNotValidatedMaterials)

router.put('/evaluate_practical_report/:report_name', AuthMiddleware, docenteOrientadorController.putEvaluateMaterial)

router.post('/guidance_report', AuthMiddleware, docenteOrientadorController.postGuidanceReport)

router.get('/guidance_report', AuthMiddleware, docenteOrientadorController.getGuidanceReport)

export default router