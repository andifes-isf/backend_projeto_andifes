"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _express = require('express');
var _docenteOrientadorController = require('../../controllers/usuarios/docenteOrientadorController'); var _docenteOrientadorController2 = _interopRequireDefault(_docenteOrientadorController);
var _auth = require('../../middlewares/auth'); var _auth2 = _interopRequireDefault(_auth);

const router = new (0, _express.Router)()

router.post('/', _docenteOrientadorController2.default.post)

router.get('/', _docenteOrientadorController2.default.get)

router.post('/mentee', _auth2.default, _docenteOrientadorController2.default.postOrientado)

router.delete('/mentee', _auth2.default, _docenteOrientadorController2.default.deleteOrientado)

router.get('/materiais_dos_orientandos', _auth2.default, _docenteOrientadorController2.default.getMenteesMaterials)

router.get('/materiais_nao_analisados', _auth2.default, _docenteOrientadorController2.default.getNotEvaluatedMaterials)

router.get('/materiais_nao_validados', _auth2.default, _docenteOrientadorController2.default.getNotValidatedMaterials)

router.put('/analisar_material/:material_name', _auth2.default, _docenteOrientadorController2.default.putEvaluateMaterial)

router.post('/guidance_report', _auth2.default, _docenteOrientadorController2.default.postGuidanceReport)

router.get('/guidance_report', _auth2.default, _docenteOrientadorController2.default.getGuidanceReport)

exports. default = router