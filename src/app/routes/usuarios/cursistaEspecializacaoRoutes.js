import { Router } from "express"
import cursistaEspecializacaoController from "../../controllers/usuarios/cursistaEspecializacaoController"
import AuthMiddleware from '../../middlewares/auth'

const router = new Router()

router.post('/', cursistaEspecializacaoController.post)

router.get('/', cursistaEspecializacaoController.get)

router.post('/inserir_material', AuthMiddleware, cursistaEspecializacaoController.postMaterial)

router.get('/meus_materiais', AuthMiddleware, cursistaEspecializacaoController.getMeusMateriais)

export default router