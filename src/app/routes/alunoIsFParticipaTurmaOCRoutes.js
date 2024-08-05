import { Router } from "express"
import AlunoIsFParticipaTurmaOCController from '../controllers/alunoIsFParticipaTurmaOCController'

const router = new Router()

router.post('/', AlunoIsFParticipaTurmaOCController.post)

export default router