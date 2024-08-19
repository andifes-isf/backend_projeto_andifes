"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _express = require('express');
var _professorIsFController = require('../controllers/professorIsFController'); var _professorIsFController2 = _interopRequireDefault(_professorIsFController);

const router = new (0, _express.Router)()

router.get('/', _professorIsFController2.default.get)

exports. default = router