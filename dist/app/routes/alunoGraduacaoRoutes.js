"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _express = require('express');
var _alunoGraduacaoController = require('../controllers/alunoGraduacaoController'); var _alunoGraduacaoController2 = _interopRequireDefault(_alunoGraduacaoController);

const router = new (0, _express.Router)()

router.post('/', _alunoGraduacaoController2.default.post)

router.get('/', _alunoGraduacaoController2.default.get)

exports. default = router