"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { newObj[key] = obj[key]; } } } newObj.default = obj; return newObj; } } function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _yup = require('yup'); var Yup = _interopRequireWildcard(_yup);
var _alunodeinstituicao = require('../models/alunodeinstituicao'); var _alunodeinstituicao2 = _interopRequireDefault(_alunodeinstituicao);
var _alunoIsFController = require('./alunoIsFController'); var _alunoIsFController2 = _interopRequireDefault(_alunoIsFController);
var _instituicaoensino = require('../models/instituicaoensino'); var _instituicaoensino2 = _interopRequireDefault(_instituicaoensino);
var _alunoisf = require('../models/alunoisf'); var _alunoisf2 = _interopRequireDefault(_alunoisf);
var _usuario = require('../models/usuario'); var _usuario2 = _interopRequireDefault(_usuario);

class alunoDeinstituicaoController {
    async post(req, res) {
        try {
            await _alunoIsFController2.default.post(req, res, 1)
            
            const alunoExistente = await _alunodeinstituicao2.default.findOne({
                where: {
                    login: req.body.login
                }
            })
    
            if(alunoExistente) {
                return res.status(409).json({
                    msg: "Aluno de Instituicao ja cadastrado"
                })
            }
    
            const aluno = await _alunodeinstituicao2.default.create({
                nDocumento: req.body.nDocumento,
                cargo: req.body.cargo,
                areaAtuacao: req.body.areaAtuacao,
                login: req.body.login
            })
        
            return res.status(201).json(aluno)
        } catch (error) {
            return res.status(500).json("Ocorreu um erro interno no servidor: " + error)
        }

    }

    async get(_, res) {
        try {
            const alunos = await _alunodeinstituicao2.default.findAll({
                include: [
                    {
                        model: _alunoisf2.default,
                        attributes: {
                            exclude: ['login']
                        },
                        include: [{
                            model: _usuario2.default,
                            attributes: {
                                exclude: ['login', 'senha_encriptada', 'ativo', 'tipo']
                            }
                        }]
                    },    
                    {
                        model: _instituicaoensino2.default,
                        attributes: {
                            exclude: ['idInstituicao']
                        },
                        through: {
                            attributes: {
                                exclude: ['login', 'idInstituicao'],
                                include: ['inicio']
                            }
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

exports. default = new alunoDeinstituicaoController()