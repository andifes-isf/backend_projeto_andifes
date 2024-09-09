"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _express = require('express');
var _auth = require('../../middlewares/auth'); var _auth2 = _interopRequireDefault(_auth);
var _proeficienciaAlunoIsFController = require('../../controllers/proeficiencia/proeficienciaAlunoIsFController'); var _proeficienciaAlunoIsFController2 = _interopRequireDefault(_proeficienciaAlunoIsFController);

const router = new (0, _express.Router)()

router.post('/', _auth2.default, _proeficienciaAlunoIsFController2.default.post)

exports. default = router