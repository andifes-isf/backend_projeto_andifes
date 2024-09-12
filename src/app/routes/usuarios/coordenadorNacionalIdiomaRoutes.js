import { Router } from "express"
import coordenadorNacionalIdiomaController from "../../controllers/usuarios/coordenadorNacionalIdiomaController"

const router = new Router()

router.post('/', coordenadorNacionalIdiomaController.post)

router.get('/', coordenadorNacionalIdiomaController.get)

export default router