import { Router } from "express"
import professorIsFController from "../../controllers/usuarios/professorIsFController"

const router = new Router()

router.get('/', professorIsFController.get)

export default router