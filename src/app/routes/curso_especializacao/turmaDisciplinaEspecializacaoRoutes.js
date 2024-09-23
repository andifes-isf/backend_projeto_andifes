import { Router } from "express"
import turmaDisciplinaEspecializacaoController from "../../controllers/curso_especializacao/turmadisciplinaespecializacaoController"
import AuthMiddleware from '../../middlewares/auth'

const router = new Router()

router.post('/', turmaDisciplinaEspecializacaoController.post)

router.get('/', turmaDisciplinaEspecializacaoController.get)

router.put('/:nome', AuthMiddleware, turmaDisciplinaEspecializacaoController.updateData)

export default router