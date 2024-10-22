import { Router } from "express"
import docenteOrientadorController from "../../controllers/usuarios/docenteOrientadorController"
import AuthMiddleware from '../../middlewares/auth'

const router = new Router()

router.post('/', docenteOrientadorController.post)

router.get('/', docenteOrientadorController.get)

router.post('/adicionar_orientado', AuthMiddleware, docenteOrientadorController.postOrientado)

// router.get('/materiais_dos_orientandos', AuthMiddleware, docenteOrientadorController.getMaterialDoOrientado)

// router.get('/materiais_nao_analisados', AuthMiddleware, docenteOrientadorController.getMaterialNaoAnalisado)

// router.get('/materiais_nao_validados', AuthMiddleware, docenteOrientadorController.getMaterialNaoValidado)

// router.put('/analisar_material/:nomeMaterial', AuthMiddleware, docenteOrientadorController.putAnalisarMaterial)

export default router