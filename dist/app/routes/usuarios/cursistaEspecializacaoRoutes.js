"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _express = require('express');
var _cursistaEspecializacaoController = require('../../controllers/usuarios/cursistaEspecializacaoController'); var _cursistaEspecializacaoController2 = _interopRequireDefault(_cursistaEspecializacaoController);
var _auth = require('../../middlewares/auth'); var _auth2 = _interopRequireDefault(_auth);

const router = new (0, _express.Router)()

router.post('/', _cursistaEspecializacaoController2.default.post)

router.get('/', _cursistaEspecializacaoController2.default.get)

router.post('/practical_report', _auth2.default, _cursistaEspecializacaoController2.default.postPracticalReport)

router.get('/my_practical_reports', _auth2.default, _cursistaEspecializacaoController2.default.getMyMaterials)

router.get('/practical_report/:name', _auth2.default, _cursistaEspecializacaoController2.default.getMaterial)

router.get('/practical_report_not_viewed', _auth2.default, _cursistaEspecializacaoController2.default.getNotViewedMaterials)

router.post('/class/:name', _auth2.default, _cursistaEspecializacaoController2.default.postCursaTurma)

router.get('/my_classes', _auth2.default, _cursistaEspecializacaoController2.default.getMinhasTurmas)

router.post('/interest_in_disciplina', _auth2.default, _cursistaEspecializacaoController2.default.postInteresseNaDisciplina)

router.post('/feedback', _auth2.default, _cursistaEspecializacaoController2.default.postReclamation)

exports. default = router