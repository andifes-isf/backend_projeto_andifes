import { Router } from "express"
import turmaDisciplinaEspecializacaoController from "../../controllers/curso_especializacao/turmadisciplinaespecializacaoController"

const router = new Router()

router.post('/', turmaDisciplinaEspecializacaoController.post)

router.get('/', turmaDisciplinaEspecializacaoController.get)

router.put('/:nome', turmaDisciplinaEspecializacaoController.updateData)

export default router