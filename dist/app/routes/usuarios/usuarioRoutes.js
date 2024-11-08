"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _express = require('express');
var _usuarioController = require('../../controllers/usuarios/usuarioController'); var _usuarioController2 = _interopRequireDefault(_usuarioController);
var _auth = require('../../middlewares/auth'); var _auth2 = _interopRequireDefault(_auth);

const controller = new (0, _usuarioController2.default)()

const router = new (0, _express.Router)()

router.get('/', controller.get)

router.get('/meus_dados', _auth2.default, controller.getMyData)

router.get('/notificacoes', _auth2.default, controller.getNotificacoes)

router.get('/notificacoes_nao_lidas', _auth2.default, controller.getNotificacoesNaoLidas)

router.get('/notificacao/:idNotificacao', _auth2.default, controller.getNotificacao)

exports. default = router