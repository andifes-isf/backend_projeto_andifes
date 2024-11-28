"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _express = require('express');
var _professorIsFMinistraTurmaOCController = require('../../controllers/ofertacoletiva/professorIsFMinistraTurmaOCController'); var _professorIsFMinistraTurmaOCController2 = _interopRequireDefault(_professorIsFMinistraTurmaOCController);
var _auth = require('../../middlewares/auth'); var _auth2 = _interopRequireDefault(_auth);

const router = new (0, _express.Router)()

router.post('/:idTurma', _auth2.default, _professorIsFMinistraTurmaOCController2.default.post)

exports. default = router