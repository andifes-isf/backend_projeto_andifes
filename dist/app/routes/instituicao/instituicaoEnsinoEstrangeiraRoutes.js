"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _express = require('express');
var _instituicaoEnsinoEstrangeiraController = require('../../controllers/instituicao/instituicaoEnsinoEstrangeiraController'); var _instituicaoEnsinoEstrangeiraController2 = _interopRequireDefault(_instituicaoEnsinoEstrangeiraController);

const router = new (0, _express.Router)()

router.post('/', _instituicaoEnsinoEstrangeiraController2.default.post)

router.get('/', _instituicaoEnsinoEstrangeiraController2.default.get)

exports. default = router