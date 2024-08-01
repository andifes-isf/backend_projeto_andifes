"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _express = require('express');
var _professorIsFMinistraTurmaOCController = require('../controllers/professorIsFMinistraTurmaOCController'); var _professorIsFMinistraTurmaOCController2 = _interopRequireDefault(_professorIsFMinistraTurmaOCController);

const router = new (0, _express.Router)()

router.post('/', _professorIsFMinistraTurmaOCController2.default.post)

router.get('/', _professorIsFMinistraTurmaOCController2.default.get)

exports. default = router