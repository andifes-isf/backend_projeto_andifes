import { Router } from "express"
import usuarioController from "../controllers/usuarios/usuarioController"
import AuthMiddleware from '../../app/middlewares/auth'

const router = new Router()

router.post('/', usuarioController.post)

router.get('/', usuarioController.get)

router.get('/meus_dados', AuthMiddleware, usuarioController.getMyData)

export default router