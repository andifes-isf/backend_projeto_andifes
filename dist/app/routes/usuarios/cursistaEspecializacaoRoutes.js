"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _express = require('express');
var _cursistaEspecializacaoController = require('../../controllers/usuarios/cursistaEspecializacaoController'); var _cursistaEspecializacaoController2 = _interopRequireDefault(_cursistaEspecializacaoController);
var _auth = require('../../middlewares/auth'); var _auth2 = _interopRequireDefault(_auth);

const router = new (0, _express.Router)()

router.post('/', _cursistaEspecializacaoController2.default.post)

router.get('/', _cursistaEspecializacaoController2.default.get)

router.post('/inserir_relatorio_pratico', _auth2.default, _cursistaEspecializacaoController2.default.postPracticalReport)

router.get('/meus_materiais', _auth2.default, _cursistaEspecializacaoController2.default.getMyMaterials)

router.get('/material/:nome', _auth2.default, _cursistaEspecializacaoController2.default.getMaterial)

router.get('/materiais_nao_visualizados', _auth2.default, _cursistaEspecializacaoController2.default.getNotViewedMaterials)

router.post('/participar_turma/:nome_turma', _auth2.default, _cursistaEspecializacaoController2.default.postCursaTurma)

router.get('/minhas_turmas', _auth2.default, _cursistaEspecializacaoController2.default.getMinhasTurmas)

router.post('/interesse_nas_disciplinas', _auth2.default, _cursistaEspecializacaoController2.default.postInteresseNaDisciplina)

router.post('/reclamacao', _auth2.default, _cursistaEspecializacaoController2.default.postReclamation)

exports. default = router