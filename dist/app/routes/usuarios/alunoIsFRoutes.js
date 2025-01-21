"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _express = require('express');
var _auth = require('../../middlewares/auth'); var _auth2 = _interopRequireDefault(_auth);
var _alunoIsFController = require('../../controllers/usuarios/alunoIsFController'); var _alunoIsFController2 = _interopRequireDefault(_alunoIsFController);

const controller = new (0, _alunoIsFController2.default)()

const router = new (0, _express.Router)()

router.get('/', controller.get)

router.post('/proeficiency', _auth2.default, controller.postProeficiencia)

router.get('/my_proeficiency', _auth2.default, controller.getMinhaProeficiencia)

exports. default = router