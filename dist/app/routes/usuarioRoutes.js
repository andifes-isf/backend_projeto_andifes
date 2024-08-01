"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _express = require('express');
var _usuarioController = require('../controllers/usuarioController'); var _usuarioController2 = _interopRequireDefault(_usuarioController);

const router = new (0, _express.Router)()

router.post('/', _usuarioController2.default.post)

router.get('/', _usuarioController2.default.get)

exports. default = router