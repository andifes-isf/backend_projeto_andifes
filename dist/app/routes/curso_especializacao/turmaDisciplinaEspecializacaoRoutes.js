"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _express = require('express');
var _turmaDisciplinaEspecializacaoController = require('../../controllers/curso_especializacao/turmaDisciplinaEspecializacaoController'); var _turmaDisciplinaEspecializacaoController2 = _interopRequireDefault(_turmaDisciplinaEspecializacaoController);

const router = new (0, _express.Router)()

router.post('/', _turmaDisciplinaEspecializacaoController2.default.post)

router.get('/', _turmaDisciplinaEspecializacaoController2.default.get)

exports. default = router