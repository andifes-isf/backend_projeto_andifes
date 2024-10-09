"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _express = require('express');
var _turmadisciplinaespecializacaoController = require('../../controllers/curso_especializacao/turmadisciplinaespecializacaoController'); var _turmadisciplinaespecializacaoController2 = _interopRequireDefault(_turmadisciplinaespecializacaoController);

const router = new (0, _express.Router)()

router.post('/', _turmadisciplinaespecializacaoController2.default.post)

router.get('/', _turmadisciplinaespecializacaoController2.default.get)

router.get('/:ano', _turmadisciplinaespecializacaoController2.default.getPorAno)

exports. default = router