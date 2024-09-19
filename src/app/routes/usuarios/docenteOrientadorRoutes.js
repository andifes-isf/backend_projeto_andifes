import { Router } from "express"
import docenteOrientadorController from "../../controllers/usuarios/docenteOrientadorController"

const router = new Router()

router.post('/', docenteOrientadorController.post)

router.get('/', docenteOrientadorController.get)

export default router