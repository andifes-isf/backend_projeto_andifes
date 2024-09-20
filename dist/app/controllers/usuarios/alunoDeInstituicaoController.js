"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { newObj[key] = obj[key]; } } } newObj.default = obj; return newObj; } } function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _yup = require('yup'); var Yup = _interopRequireWildcard(_yup);

// Models
var _alunodeinstituicao = require('../../models/usuarios/alunodeinstituicao'); var _alunodeinstituicao2 = _interopRequireDefault(_alunodeinstituicao);
var _alunoisf = require('../../models/usuarios/alunoisf'); var _alunoisf2 = _interopRequireDefault(_alunoisf);
var _comprovantealunoinstituicao = require('../../models/usuario_pertence_instituicao/comprovantealunoinstituicao'); var _comprovantealunoinstituicao2 = _interopRequireDefault(_comprovantealunoinstituicao);
var _usuario = require('../../models/usuarios/usuario'); var _usuario2 = _interopRequireDefault(_usuario);

// Controller
var _alunoIsFController = require('./alunoIsFController'); var _alunoIsFController2 = _interopRequireDefault(_alunoIsFController);

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
                        model: InstituicaoEnsino,
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

    async postInstituicao(req, res){
        try {
            if(!(req.tipoUsuario === 'alunoisf')){
                return res.status(403).json({
                    error: 'Acesso negado'
                })
            }

            const comprovanteExistente = await _comprovantealunoinstituicao2.default.findOne({
                where: {
                    login: req.loginUsuario,
                    idInstituicao: req.body.idInstituicao,
                    inicio: req.body.inicio
                }
            })
    
            if(comprovanteExistente) {
                return res.status(409).json({
                    msg: "Comprovante de Aluno ja cadastrado"
                })
            }
            
            const comprovante = await _comprovantealunoinstituicao2.default.create({
                idInstituicao: req.body.idInstituicao,
                login: req.loginUsuario,
                inicio: req.body.inicio,
                termino: req.body.termino || null,
                comprovante: req.body.comprovante
            })
    
            return res.status(201).json(comprovante)    
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    async getMinhasInstituicoes(req, res){
        try {
            if(!(_alunodeinstituicao2.default.findOne({where: {login: req.loginUsuario}}))){
                return res.status(403).json({
                    error: 'Acesso negado'
                })
            }

            const instituicoes = await _comprovantealunoinstituicao2.default.findAll({
                where: {
                    login: req.loginUsuario
                }
            })

            return res.status(200).json(instituicoes)
        } catch (error) {
            return res.status(500).json('Ocorreu um erro interno no servidor: ' + error)
        }
    }

    async getInstituicaoAtual(req, res){
        try {
            if(!(_alunodeinstituicao2.default.findOne({where: {login: req.loginUsuario}}))){
                return res.status(403).json({
                    error: 'Acesso negado'
                })
            }

            const instituicao = await _comprovantealunoinstituicao2.default.findOne({
                where: {
                    login: req.loginUsuario
                }
            })

            return res.status(200).json(instituicao)
        } catch (error) {
            return res.status(500).json('Ocorreu um erro interno no servidor: ' + error)
        }
    }
}

exports. default = new alunoDeinstituicaoController()