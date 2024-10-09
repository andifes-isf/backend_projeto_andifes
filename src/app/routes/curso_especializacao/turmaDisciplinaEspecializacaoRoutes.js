import { Router } from "express"
import turmaDisciplinaEspecializacaoController from "../../controllers/curso_especializacao/turmadisciplinaespecializacaoController"

const router = new Router()

router.post('/', turmaDisciplinaEspecializacaoController.post)

router.get('/', turmaDisciplinaEspecializacaoController.get)

router.get('/:ano', turmaDisciplinaEspecializacaoController.getPorAno)

export default router