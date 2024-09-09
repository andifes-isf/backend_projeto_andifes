"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { newObj[key] = obj[key]; } } } newObj.default = obj; return newObj; } } function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _yup = require('yup'); var Yup = _interopRequireWildcard(_yup);
var _alunoisf = require('../models/usuarios/alunoisf'); var _alunoisf2 = _interopRequireDefault(_alunoisf);
var _usuarioController = require('./usuarioController'); var _usuarioController2 = _interopRequireDefault(_usuarioController);
var _turmaoc = require('../models/ofertacoletiva/turmaoc'); var _turmaoc2 = _interopRequireDefault(_turmaoc);
var _curso = require('../models/ofertacoletiva/curso'); var _curso2 = _interopRequireDefault(_curso);

class alunoIsFController {
    async post(req, res, deInstituicao) {
        try {
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
        } catch (error) {
            return res.status(500).json("Ocorreu um erro interno no servidor: " + error)            
        }
    }

    async get(_, res){
        try {
            const alunos = await _alunoisf2.default.findAll({
                include: [
                    {
                        model: _turmaoc2.default,
                        attributes: {
                            exclude: ['idTurma', 'idCurso', ]
                        },
                        include: {
                            model: _curso2.default,
                            attributes: ['nome']
                        },
                        through: {
                            attributes: []
                        }
                    }
                ]
            })
    
            return res.status(200).json(alunos)
        } catch (error) {
            return res.status(500).json("Ocorreu um erro interno no servidor: " + error)
        }
    }
}

exports. default = new alunoIsFController()