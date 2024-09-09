"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _express = require('express');
var _cursoController = require('../../controllers/ofertacoletiva/cursoController'); var _cursoController2 = _interopRequireDefault(_cursoController);

const router = new (0, _express.Router)()

router.post('/', _cursoController2.default.post)

router.get('/', _cursoController2.default.get)

exports. default = router