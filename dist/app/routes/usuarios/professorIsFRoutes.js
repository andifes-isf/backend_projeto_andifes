"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _express = require('express');
var _professorIsFController = require('../../controllers/usuarios/professorIsFController'); var _professorIsFController2 = _interopRequireDefault(_professorIsFController);
var _auth = require('../../middlewares/auth'); var _auth2 = _interopRequireDefault(_auth);

const router = new (0, _express.Router)()

router.get('/', _professorIsFController2.default.get)

router.post('/adicionar_proeficiencia', _auth2.default, _professorIsFController2.default.postProeficiencia)

router.get('/visualizar_minha_proeficiencia', _auth2.default, _professorIsFController2.default.getMinhaProeficiencia)

router.post('/adicionar_instituicao/:idInstituicao', _auth2.default, _professorIsFController2.default.postInstituicao)

router.get('/visualizar_minhas_instituicoes', _auth2.default, _professorIsFController2.default.getMinhasInstituicoes)

router.get('/visualizar_instituicao_atual', _auth2.default, _professorIsFController2.default.getInstituicaoAtual)

exports. default = router
