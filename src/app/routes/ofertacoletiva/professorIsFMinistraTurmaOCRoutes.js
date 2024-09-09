import { Router } from "express"
import professorIsFMinistraTurmaOC from "../../controllers/ofertacoletiva/professorIsFMinistraTurmaOCController"
import AuthMiddleware from '../../middlewares/auth'

const router = new Router()

router.post('/', AuthMiddleware, professorIsFMinistraTurmaOC.post)

router.get('/', professorIsFMinistraTurmaOC.get)

export default router