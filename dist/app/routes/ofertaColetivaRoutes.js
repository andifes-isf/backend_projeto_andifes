"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _express = require('express');
var _ofertaColetivaController = require('../controllers/ofertaColetivaController'); var _ofertaColetivaController2 = _interopRequireDefault(_ofertaColetivaController);

const router = new (0, _express.Router)()

router.post('/', _ofertaColetivaController2.default.post)

router.get('/', _ofertaColetivaController2.default.get)

exports. default = router