import { Router } from "express"
import docenteMinistranteController from "../../controllers/usuarios/docenteMinistranteController"

const router = new Router()

router.post('/', docenteMinistranteController.post)

router.get('/', docenteMinistranteController.get)

export default router