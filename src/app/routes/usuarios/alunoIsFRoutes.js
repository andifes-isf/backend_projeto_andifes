import { Router } from "express"
import AuthMiddleware from '../../middlewares/auth'
import alunoIsFController from "../../controllers/usuarios/alunoIsFController"

const router = new Router()

router.post('/', alunoIsFController.post)

router.get('/', alunoIsFController.get)

router.post('/adicionar_proeficiencia', AuthMiddleware, alunoIsFController.postProeficiencia)

router.get('/visualizar_minha_proeficiencia', AuthMiddleware, alunoIsFController.getMinhaProeficiencia)

export default router