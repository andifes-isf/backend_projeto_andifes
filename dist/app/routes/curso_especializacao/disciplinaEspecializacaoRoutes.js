"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _express = require('express');
var _disciplinaEspecializacaoController = require('../../controllers/curso_especializacao/disciplinaEspecializacaoController'); var _disciplinaEspecializacaoController2 = _interopRequireDefault(_disciplinaEspecializacaoController);

const router = new (0, _express.Router)()

router.post('/', _disciplinaEspecializacaoController2.default.post)

router.get('/', _disciplinaEspecializacaoController2.default.get)

exports. default = router