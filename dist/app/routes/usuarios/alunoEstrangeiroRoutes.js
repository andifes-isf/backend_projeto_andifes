"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _express = require('express');
var _alunoEstrangeiroController = require('../../controllers/usuarios/alunoEstrangeiroController'); var _alunoEstrangeiroController2 = _interopRequireDefault(_alunoEstrangeiroController);

const router = new (0, _express.Router)()

router.post('/', _alunoEstrangeiroController2.default.post)

router.get('/', _alunoEstrangeiroController2.default.get)

exports. default = router