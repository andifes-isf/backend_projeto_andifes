import { Router } from "express"
import turmaOCController from "../controllers/ofertacoletiva/turmaOCController"
import AuthMiddleware from '../../app/middlewares/auth'

const router = new Router()

router.post('/', AuthMiddleware, turmaOCController.post)

router.get('/', turmaOCController.get)

export default router