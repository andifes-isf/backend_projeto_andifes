"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _express = require('express');
var _coordenadorNacionalIdiomaController = require('../../controllers/usuarios/coordenadorNacionalIdiomaController'); var _coordenadorNacionalIdiomaController2 = _interopRequireDefault(_coordenadorNacionalIdiomaController);

const router = new (0, _express.Router)()

router.post('/', _coordenadorNacionalIdiomaController2.default.post)

router.get('/', _coordenadorNacionalIdiomaController2.default.get)

exports. default = router