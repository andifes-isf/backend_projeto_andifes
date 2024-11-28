import { Router } from "express"
import professorIsFMinistraTurmaOC from "../../controllers/ofertacoletiva/professorIsFMinistraTurmaOCController"
import AuthMiddleware from '../../middlewares/auth'

const router = new Router()

router.post('/:idTurma', AuthMiddleware, professorIsFMinistraTurmaOC.post)

export default router