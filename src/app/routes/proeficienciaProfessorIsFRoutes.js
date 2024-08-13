import { Router } from "express"
import AuthMiddleware from '../../app/middlewares/auth'
import ProeficienciaProfessorIsFController from "../controllers/proeficienciaProfessorIsFController"

const router = new Router()

router.post('/', AuthMiddleware, ProeficienciaProfessorIsFController.post)

export default router