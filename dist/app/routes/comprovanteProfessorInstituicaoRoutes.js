"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _express = require('express');
var _auth = require('../../app/middlewares/auth'); var _auth2 = _interopRequireDefault(_auth);
var _comprovanteProfessorInstituicaoController = require('../controllers/comprovanteProfessorInstituicaoController'); var _comprovanteProfessorInstituicaoController2 = _interopRequireDefault(_comprovanteProfessorInstituicaoController);

const router = new (0, _express.Router)()

router.post('/', _auth2.default, _comprovanteProfessorInstituicaoController2.default.post)

exports. default = router