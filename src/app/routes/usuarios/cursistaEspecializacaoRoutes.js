import { Router } from "express"
import cursistaEspecializacaoController from "../../controllers/usuarios/cursistaEspecializacaoController"

const router = new Router()

router.post('/', cursistaEspecializacaoController.post)

router.get('/', cursistaEspecializacaoController.get)

export default router