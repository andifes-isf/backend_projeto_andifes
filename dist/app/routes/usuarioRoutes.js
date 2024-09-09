"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _express = require('express');
var _usuarioController = require('../controllers/usuarios/usuarioController'); var _usuarioController2 = _interopRequireDefault(_usuarioController);
var _auth = require('../../app/middlewares/auth'); var _auth2 = _interopRequireDefault(_auth);

const router = new (0, _express.Router)()

router.post('/', _usuarioController2.default.post)

router.get('/', _usuarioController2.default.get)

router.get('/meus_dados', _auth2.default, _usuarioController2.default.getMyData)

exports. default = router