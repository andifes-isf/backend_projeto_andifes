"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _express = require('express');
var _instituicaoEnsinoBrasileiraController = require('../controllers/instituicaoEnsinoBrasileiraController'); var _instituicaoEnsinoBrasileiraController2 = _interopRequireDefault(_instituicaoEnsinoBrasileiraController);

const router = new (0, _express.Router)()

router.post('/', _instituicaoEnsinoBrasileiraController2.default.post)

router.get('/', _instituicaoEnsinoBrasileiraController2.default.get)

exports. default = router