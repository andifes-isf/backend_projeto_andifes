import { Router } from "express"
import AlunoIsFParticipaTurmaOCController from '../controllers/ofertacoletiva/alunoIsFParticipaTurmaOCController'
import AuthMiddleware from '../../app/middlewares/auth'

const router = new Router()

router.post('/', AuthMiddleware, AlunoIsFParticipaTurmaOCController.post)

export default router