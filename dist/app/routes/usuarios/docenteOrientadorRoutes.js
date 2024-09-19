"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _express = require('express');
var _docenteOrientadorController = require('../../controllers/usuarios/docenteOrientadorController'); var _docenteOrientadorController2 = _interopRequireDefault(_docenteOrientadorController);

const router = new (0, _express.Router)()

router.post('/', _docenteOrientadorController2.default.post)

router.get('/', _docenteOrientadorController2.default.get)

exports. default = router