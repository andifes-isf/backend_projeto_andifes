"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _express = require('express');
var _alunoDeInstituicaoController = require('../../controllers/usuarios/alunoDeInstituicaoController'); var _alunoDeInstituicaoController2 = _interopRequireDefault(_alunoDeInstituicaoController);

const router = new (0, _express.Router)()

router.post('/', _alunoDeInstituicaoController2.default.post)

router.get('/', _alunoDeInstituicaoController2.default.get)

exports. default = router