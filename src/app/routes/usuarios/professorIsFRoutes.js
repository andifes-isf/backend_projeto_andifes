import { Router } from "express"
import professorIsFController from "../../controllers/usuarios/professorIsFController"
import AuthMiddleware from '../../middlewares/auth'

const router = new Router()

router.get('/', professorIsFController.get)

router.post('/adicionar_proeficiencia', AuthMiddleware, professorIsFController.postProeficiencia)

router.get('/visualizar_minha_proeficiencia', AuthMiddleware, professorIsFController.getMinhaProeficiencia)

export default router
