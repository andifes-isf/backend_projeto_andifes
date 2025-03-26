"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _express = require('express');
var _usuarioController = require('../../controllers/usuarios/usuarioController'); var _usuarioController2 = _interopRequireDefault(_usuarioController);
var _auth = require('../../middlewares/auth'); var _auth2 = _interopRequireDefault(_auth);

const controller = new (0, _usuarioController2.default)()

const router = new (0, _express.Router)()

router.get('/', controller.get)

router.get('/my_data', _auth2.default, controller.getMyData)

router.get('/notification', _auth2.default, controller.getNotificacoes)

router.get('/unread_notifications', _auth2.default, controller.getNotificacoesNaoLidas)

router.get('/notification/:notificationId', _auth2.default, controller.getNotificacao)

router.put('/update_my_data', _auth2.default, controller.updateMyData);

exports. default = router