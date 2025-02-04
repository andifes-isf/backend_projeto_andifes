import { Router } from "express"
import usuarioController from "./usuarioController"
import AuthMiddleware from '../middlewares/auth'
import UserRepositorySequelize from './repository/UserRepositorySequelize'

const controller = new usuarioController()

const router = new Router()

router.get('/', controller.get)

router.get('/my_data', AuthMiddleware, controller.getMyData)

router.get('/notification', AuthMiddleware, controller.getNotificacoes)

router.get('/unread_notifications', AuthMiddleware, controller.getNotificacoesNaoLidas)

router.get('/notification/:notificationId', AuthMiddleware, controller.getNotificacao)

export default router