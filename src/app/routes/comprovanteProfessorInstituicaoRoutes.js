import { Router } from "express"
import comprovanteProfessorInstituicaoController from "../controllers/comprovanteProfessorInstituicaoController"

const router = new Router()

router.post('/', comprovanteProfessorInstituicaoController.post)

export default router