import { Router } from "express"
import comprovanteAlunoInstituicaoController from "../controllers/comprovanteAlunoInstituicaoController"

const router = new Router()

router.post('/', comprovanteAlunoInstituicaoController.post)

export default router