import { Router } from "express"
import docenteOrientadorController from "../../controllers/usuarios/docenteOrientadorController"
import AuthMiddleware from '../../middlewares/auth'

const router = new Router()

router.post('/', docenteOrientadorController.post)

router.get('/', docenteOrientadorController.get)

router.post('/adicionar_orientado', AuthMiddleware, docenteOrientadorController.postOrientado)

router.get('/materiais_dos_orientandos', AuthMiddleware, docenteOrientadorController.getMenteesMaterials)

router.get('/materiais_nao_analisados', AuthMiddleware, docenteOrientadorController.getNotEvaluatedMaterials)

router.get('/materiais_nao_validados', AuthMiddleware, docenteOrientadorController.getNotValidatedMaterials)

router.put('/analisar_material/:material_name', AuthMiddleware, docenteOrientadorController.putEvaluateMaterial)

router.post('/guidance_report', AuthMiddleware, docenteOrientadorController.postGuidanceReport)

router.get('/guidance_report', AuthMiddleware, docenteOrientadorController.getGuidanceReport)

export default router