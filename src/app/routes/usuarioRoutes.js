import { Router } from "express"
import usuarioController from "../controllers/usuarioController"

const router = new Router()

router.post('/', usuarioController.post)

router.get('/', usuarioController.get)

export default router