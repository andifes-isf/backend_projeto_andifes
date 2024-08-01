import { Router } from "express"
import professorIsFMinistraTurmaOC from "../controllers/professorIsFMinistraTurmaOCController"

const router = new Router()

router.post('/', professorIsFMinistraTurmaOC.post)

router.get('/', professorIsFMinistraTurmaOC.get)

export default router