import { Router } from "express"
import editalCursoEspecializacaoController from '../../controllers/curso_especializacao/editalCursoEspecializacaoController'

const router = new Router()

router.get('/', editalCursoEspecializacaoController.get)

router.get('/:criador', editalCursoEspecializacaoController.getEditalPorCoordenador)

export default router