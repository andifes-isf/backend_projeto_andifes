import { Router } from "express"
import turmaDisciplinaEspecializacaoController from "../../controllers/curso_especializacao/turmaDisciplinaEspecializacaoController"

const router = new Router()

router.post('/', turmaDisciplinaEspecializacaoController.post)

router.get('/', turmaDisciplinaEspecializacaoController.get)

export default router