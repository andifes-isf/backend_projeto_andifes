import { Router } from "express"
import professorIsFMinistraTurmaOC from "../controllers/professorIsFMinistraTurmaOCController"
import AuthMiddleware from '../../app/middlewares/auth'

const router = new Router()

router.post('/', AuthMiddleware, professorIsFMinistraTurmaOC.post)

router.get('/', professorIsFMinistraTurmaOC.get)

export default router