"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _express = require('express');
var _turmaOCController = require('../controllers/turmaOCController'); var _turmaOCController2 = _interopRequireDefault(_turmaOCController);

const router = new (0, _express.Router)()

router.post('/', _turmaOCController2.default.post)

router.get('/', _turmaOCController2.default.get)

exports. default = router