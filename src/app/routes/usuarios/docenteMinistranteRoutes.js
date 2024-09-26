import { Router } from "express"
import docenteMinistranteController from "../../controllers/usuarios/docenteMinistranteController"
import AuthMiddleware from '../../middlewares/auth'

const router = new Router()

router.post('/', docenteMinistranteController.post)

router.get('/', docenteMinistranteController.get)

router.get('/minhas_turmas', AuthMiddleware, docenteMinistranteController.getMinhasTurmas)

export default router