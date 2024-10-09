import { Router } from "express"
import coordenadorNacionalIdiomaController from "../../controllers/usuarios/coordenadorNacionalIdiomaController"
import AuthMiddleware from '../../middlewares/auth'

const router = new Router()

router.post('/', coordenadorNacionalIdiomaController.post)

router.get('/', coordenadorNacionalIdiomaController.get)

router.put('/:nome', AuthMiddleware, coordenadorNacionalIdiomaController.updateData)

export default router