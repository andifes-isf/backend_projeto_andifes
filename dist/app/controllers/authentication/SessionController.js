"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { newObj[key] = obj[key]; } } } newObj.default = obj; return newObj; } } function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _jsonwebtoken = require('jsonwebtoken'); var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);
var _yup = require('yup'); var Yup = _interopRequireWildcard(_yup);
var _bcrypt = require('bcrypt'); var _bcrypt2 = _interopRequireDefault(_bcrypt);
var _usuario = require('../../models/usuarios/usuario'); var _usuario2 = _interopRequireDefault(_usuario);
var _auth = require('../../../config/auth'); var _auth2 = _interopRequireDefault(_auth);
var _messages_pt = require('../../utils/messages/messages_pt'); var _messages_pt2 = _interopRequireDefault(_messages_pt);

class SessionController {
    async store(req, res) {
        // Consistencia se o dado (constraint) confere na base
        let {
            login,
            senha
        } = req.body

        const usuario = await _usuario2.default.findOne({
            where: {
                login
            }
        })

        if(!usuario) {
            return res.status(401).json({
                error: _messages_pt2.default.USER_NOT_FOUNDED
            })
        }

        // Consistencia se a senha confere no Model
        if(!(await _bcrypt2.default.compare(senha, usuario.senha_encriptada))) {
            return res.status(401).json({
                msg: _messages_pt2.default.INVALID_PASSWORD
            })
        }

        const { tipo } = usuario

        return res.json({
            usuario: {
                login,
                tipo
            },
            token: _jsonwebtoken2.default.sign({
                login,
                tipo
            }, _auth2.default.secret, {
                expiresIn: _auth2.default.expiresIn
            })
        })
    }
}

exports. default = new SessionController()