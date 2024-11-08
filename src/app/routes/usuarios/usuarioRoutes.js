import { Router } from "express"
import usuarioController from "../../controllers/usuarios/usuarioController"
import AuthMiddleware from '../../middlewares/auth'

const router = new Router()

router.post('/', usuarioController.post)

router.get('/', usuarioController.get)

router.get('/meus_dados', AuthMiddleware, usuarioController.getMyData)

router.get('/notificacoes', AuthMiddleware, usuarioController.getNotificacoes)

router.get('/notificacoes_nao_lidas', AuthMiddleware, usuarioController.getNotificacoesNaoLidas)

router.get('/notificacao/:idNotificacao', AuthMiddleware, usuarioController.getNotificacao)

export default router