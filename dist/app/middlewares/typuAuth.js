"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _jsonwebtoken = require('jsonwebtoken'); var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);
var _util = require('util');
var _auth = require('../../config/auth'); var _auth2 = _interopRequireDefault(_auth);
var _usuario = require('../models/usuario'); var _usuario2 = _interopRequireDefault(_usuario);

exports. default = async(req, res, next, tipo) => {
    console.log(tipo)

}