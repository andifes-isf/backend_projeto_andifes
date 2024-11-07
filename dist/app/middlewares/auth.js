"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _jsonwebtoken = require('jsonwebtoken'); var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);
var _util = require('util');
var _auth = require('../../config/auth'); var _auth2 = _interopRequireDefault(_auth);
var _messages_pt = require('../utils/messages/messages_pt'); var _messages_pt2 = _interopRequireDefault(_messages_pt);
var _CustomError = require('../utils/CustomError/CustomError'); var _CustomError2 = _interopRequireDefault(_CustomError);
var _httpStatus = require('../utils/httpStatus/httpStatus'); var _httpStatus2 = _interopRequireDefault(_httpStatus);

exports. default = async(req, res, next) => {
    const { authorization } = req.headers

    if(!authorization) {
        throw new (0, _CustomError2.default)(_messages_pt2.default.LOGIN_NECESSARY, _httpStatus2.default.UNAUTHORIZED)
    }

    // Desestruturação de vetor (Bearer, ...token)
    const [, token] = authorization.split(' ')

    try {
        const{ login, tipo } = await _util.promisify.call(void 0, _jsonwebtoken2.default.verify)(token, _auth2.default.secret)

        req.loginUsuario = login
        req.tipoUsuario = tipo
    } catch (error) {
        throw new (0, _CustomError2.default)(_messages_pt2.default.ACCESS_DENIED, _httpStatus2.default.UNAUTHORIZED)
    }

    return next()

}