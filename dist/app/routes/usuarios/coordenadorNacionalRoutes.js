"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _express = require('express');
var _coordenadorNacionalController = require('../../controllers/usuarios/coordenadorNacionalController'); var _coordenadorNacionalController2 = _interopRequireDefault(_coordenadorNacionalController);

const router = new (0, _express.Router)()

router.post('/', _coordenadorNacionalController2.default.post)

router.get('/', _coordenadorNacionalController2.default.get)

exports. default = router