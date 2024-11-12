import { Router } from "express"
import OuvidoriaCursoEspecializacaoController from "../../controllers/curso_especializacao/OuvidoriaCursoEspecializacaoController"

const router = new Router()

router.get('/', OuvidoriaCursoEspecializacaoController.get)

export default router