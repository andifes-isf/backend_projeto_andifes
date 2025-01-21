import { Router } from "express"
import AuthMiddleware from '../../middlewares/auth'
import alunoIsFController from "../../controllers/usuarios/alunoIsFController"

const controller = new alunoIsFController()

const router = new Router()

router.get('/', controller.get)

router.post('/proeficiency', AuthMiddleware, controller.postProeficiencia)

router.get('/my_proeficiency', AuthMiddleware, controller.getMinhaProeficiencia)

export default router