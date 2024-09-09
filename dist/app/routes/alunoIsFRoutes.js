"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _express = require('express');
var _alunoIsFController = require('../controllers/usuarios/alunoIsFController'); var _alunoIsFController2 = _interopRequireDefault(_alunoIsFController);

const router = new (0, _express.Router)()

router.post('/', _alunoIsFController2.default.post)

router.get('/', _alunoIsFController2.default.get)

exports. default = router