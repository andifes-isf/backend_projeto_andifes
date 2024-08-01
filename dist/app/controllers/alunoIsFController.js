"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { newObj[key] = obj[key]; } } } newObj.default = obj; return newObj; } } function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _yup = require('yup'); var Yup = _interopRequireWildcard(_yup);
var _alunoisf = require('../models/alunoisf'); var _alunoisf2 = _interopRequireDefault(_alunoisf);
var _usuarioController = require('./usuarioController'); var _usuarioController2 = _interopRequireDefault(_usuarioController);

class alunoIsFController {
    async post(req, res, deInstituicao) {
        await _usuarioController2.default.post(req, res, 'alunoisf')

        const alunoExistente = await _alunoisf2.default.findOne({
            where: {
                login: req.body.login
            }
        })

        if(alunoExistente) {
            return 0
        }

        return await _alunoisf2.default.create({
            login: req.body.login,
            deInstituicao: deInstituicao
        })
    }

    async get(_, res){
        const alunos = await _alunoisf2.default.findAll()

        return res.status(200).json(alunos)
    }
}

exports. default = new alunoIsFController()