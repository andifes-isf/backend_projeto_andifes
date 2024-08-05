"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _express = require('express');
var _alunoIsFParticipaTurmaOCController = require('../controllers/alunoIsFParticipaTurmaOCController'); var _alunoIsFParticipaTurmaOCController2 = _interopRequireDefault(_alunoIsFParticipaTurmaOCController);

const router = new (0, _express.Router)()

router.post('/', _alunoIsFParticipaTurmaOCController2.default.post)

exports. default = router