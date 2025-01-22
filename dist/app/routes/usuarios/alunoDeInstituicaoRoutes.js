"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _express = require('express');
var _auth = require('../../middlewares/auth'); var _auth2 = _interopRequireDefault(_auth);
var _alunoDeInstituicaoController = require('../../controllers/usuarios/alunoDeInstituicaoController'); var _alunoDeInstituicaoController2 = _interopRequireDefault(_alunoDeInstituicaoController);

const router = new (0, _express.Router)()

router.post('/', _alunoDeInstituicaoController2.default.post)

router.get('/', _alunoDeInstituicaoController2.default.get)

router.post('/institution/:institutionId', _auth2.default, _alunoDeInstituicaoController2.default.postInstituicao)

router.get('/my_institutions', _auth2.default, _alunoDeInstituicaoController2.default.getMinhasInstituicoes)

router.get('/current_institution', _auth2.default, _alunoDeInstituicaoController2.default.getInstituicaoAtual)

exports. default = router