import { Router } from "express"
import coordenadorNacionalController from "../../controllers/usuarios/coordenadorNacionalController"
import AuthMiddleware from '../../middlewares/auth'

const router = new Router()

router.post('/', coordenadorNacionalController.post)

router.get('/', coordenadorNacionalController.get)

router.post('/criar_edital_especializacao', AuthMiddleware, coordenadorNacionalController.postEdital)

export default router