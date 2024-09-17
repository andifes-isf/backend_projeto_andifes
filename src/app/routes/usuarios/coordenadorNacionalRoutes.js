import { Router } from "express"
import coordenadorNacionalController from "../../controllers/usuarios/coordenadorNacionalController"

const router = new Router()

router.post('/', coordenadorNacionalController.post)

router.get('/', coordenadorNacionalController.get)

export default router