"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _express = require('express');
var _auth = require('../../middlewares/auth'); var _auth2 = _interopRequireDefault(_auth);
var _professorIsFController = require('../../controllers/usuarios/professorIsFController'); var _professorIsFController2 = _interopRequireDefault(_professorIsFController);

const controller = new (0, _professorIsFController2.default)()
const router = new (0, _express.Router)()

router.get('/', controller.get)

router.post('/proeficiency', _auth2.default, controller.postProeficiencia)

router.get('/my_proeficiency', _auth2.default, controller.getMinhaProeficiencia)

router.post('/institution/:institutionId', _auth2.default, controller.postInstituicao)

router.get('/my_institutions', _auth2.default, controller.getMinhasInstituicoes)

router.get('/current_institution', _auth2.default, controller.getInstituicaoAtual)

exports. default = router
