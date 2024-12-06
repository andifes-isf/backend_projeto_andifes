import { Router } from "express"
import usuarioController from "../../controllers/usuarios/usuarioController"
import AuthMiddleware from '../../middlewares/auth'

const controller = new usuarioController()

const router = new Router()

router.get('/', controller.get)

router.get('/my_data', AuthMiddleware, controller.getMyData)

router.get('/notifications', AuthMiddleware, controller.getNotificacoes)

router.get('/unread_notifications', AuthMiddleware, controller.getNotificacoesNaoLidas)

router.get('/notification/:notificationId', AuthMiddleware, controller.getNotificacao)

export default router