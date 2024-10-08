"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _express = require('express');
var _docenteOrientadorController = require('../../controllers/usuarios/docenteOrientadorController'); var _docenteOrientadorController2 = _interopRequireDefault(_docenteOrientadorController);
var _auth = require('../../middlewares/auth'); var _auth2 = _interopRequireDefault(_auth);

const router = new (0, _express.Router)()

router.post('/', _docenteOrientadorController2.default.post)

router.get('/', _docenteOrientadorController2.default.get)

router.post('/adicionar_orientado', _auth2.default, _docenteOrientadorController2.default.postOrientado)

router.get('/materiais_dos_orientandos', _auth2.default, _docenteOrientadorController2.default.getMaterialDoOrientado)

router.get('/materiais_nao_analisados', _auth2.default, _docenteOrientadorController2.default.getMaterialNaoAnalisado)

router.get('/materiais_nao_validados', _auth2.default, _docenteOrientadorController2.default.getMaterialNaoValidado)

router.put('/analisar_material/:nomeMaterial', _auth2.default, _docenteOrientadorController2.default.putAnalisarMaterial)

router.get('/notificacoes', _auth2.default, _docenteOrientadorController2.default.getNotificacoes)

exports. default = router