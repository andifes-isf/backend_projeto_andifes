import { Router } from "express"
import disciplinaEspecializacaoController from "../../controllers/curso_especializacao/disciplinaEspecializacaoController"

const router = new Router()

router.post('/', disciplinaEspecializacaoController.post)

router.get('/', disciplinaEspecializacaoController.get)

export default router