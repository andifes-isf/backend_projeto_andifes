"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _express = require('express');
var _cursistaEspecializacaoController = require('../controllers/cursistaEspecializacaoController'); var _cursistaEspecializacaoController2 = _interopRequireDefault(_cursistaEspecializacaoController);

const router = new (0, _express.Router)()

router.post('/', _cursistaEspecializacaoController2.default.post)

router.get('/', _cursistaEspecializacaoController2.default.get)

exports. default = router