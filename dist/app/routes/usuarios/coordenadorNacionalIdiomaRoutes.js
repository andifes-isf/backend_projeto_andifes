"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _express = require('express');
var _coordenadorNacionalIdiomaController = require('../../controllers/usuarios/coordenadorNacionalIdiomaController'); var _coordenadorNacionalIdiomaController2 = _interopRequireDefault(_coordenadorNacionalIdiomaController);
var _auth = require('../../middlewares/auth'); var _auth2 = _interopRequireDefault(_auth);

const router = new (0, _express.Router)()

router.post('/', _coordenadorNacionalIdiomaController2.default.post)

router.get('/', _coordenadorNacionalIdiomaController2.default.get)

router.put('/:nome', _auth2.default, _coordenadorNacionalIdiomaController2.default.updateData)

exports. default = router