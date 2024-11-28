import { Router } from "express"
import AuthMiddleware from '../../middlewares/auth'
import alunoIsFController from "../../controllers/usuarios/alunoIsFController"

const controller = new alunoIsFController()

const router = new Router()

router.get('/', controller.get)

router.post('/adicionar_proeficiencia', AuthMiddleware, controller.postProeficiencia)

router.get('/visualizar_minha_proeficiencia', AuthMiddleware, controller.getMinhaProeficiencia)

export default router