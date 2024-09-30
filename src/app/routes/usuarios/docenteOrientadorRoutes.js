import { Router } from "express"
import docenteOrientadorController from "../../controllers/usuarios/docenteOrientadorController"
import AuthMiddleware from '../../middlewares/auth'

const router = new Router()

router.post('/', docenteOrientadorController.post)

router.get('/', docenteOrientadorController.get)

router.post('/adicionar_orientado', AuthMiddleware, docenteOrientadorController.postOrientado)

export default router