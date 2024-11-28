import { Router } from "express"
import usuarioController from "../../controllers/usuarios/usuarioController"
import AuthMiddleware from '../../middlewares/auth'

const controller = new usuarioController()

const router = new Router()

router.get('/', controller.get)

router.get('/meus_dados', AuthMiddleware, controller.getMyData)

router.get('/notificacoes', AuthMiddleware, controller.getNotificacoes)

router.get('/notificacoes_nao_lidas', AuthMiddleware, controller.getNotificacoesNaoLidas)

router.get('/notificacao/:idNotificacao', AuthMiddleware, controller.getNotificacao)

export default router