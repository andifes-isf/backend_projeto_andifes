"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _sequelize = require('sequelize');
var _professorisf = require('../../models/usuarios/professorisf'); var _professorisf2 = _interopRequireDefault(_professorisf);
var _usuario = require('../../models/usuarios/usuario'); var _usuario2 = _interopRequireDefault(_usuario);
var _comprovanteprofessorinstituicao = require('../../models/usuario_pertence_instituicao/comprovanteprofessorinstituicao'); var _comprovanteprofessorinstituicao2 = _interopRequireDefault(_comprovanteprofessorinstituicao);
var _instituicaoensino = require('../../models/instituicao/instituicaoensino'); var _instituicaoensino2 = _interopRequireDefault(_instituicaoensino);
var _proeficienciaprofessorisf = require('../../models/proeficiencia/proeficienciaprofessorisf'); var _proeficienciaprofessorisf2 = _interopRequireDefault(_proeficienciaprofessorisf);
var _usuarioController = require('./usuarioController'); var _usuarioController2 = _interopRequireDefault(_usuarioController);

// Utils
var _userTypes = require('../../utils/userType/userTypes'); var _userTypes2 = _interopRequireDefault(_userTypes);
var _messages_pt = require('../../utils/response/messages/messages_pt'); var _messages_pt2 = _interopRequireDefault(_messages_pt);
var _CustomError = require('../../utils/response/CustomError/CustomError'); var _CustomError2 = _interopRequireDefault(_CustomError);
var _httpStatus = require('../../utils/response/httpStatus/httpStatus'); var _httpStatus2 = _interopRequireDefault(_httpStatus);
var _ErrorType = require('../../utils/response/ErrorType/ErrorType'); var _ErrorType2 = _interopRequireDefault(_ErrorType);


class ProfessorIsFController {
    static async verifyExistingTeacher(login, inicio) {
        const existingTeacher = await _professorisf2.default.findOne({
            where: {
                login: login,
                inicio: inicio
            }
        })

        if(existingTeacher) {
            return new (0, _CustomError2.default)(
                _messages_pt2.default.EXISTING_ISF_TEACHER + login,
                _ErrorType2.default.DUPLICATE_ENTRY
            )
        }
    }

    async post(req, res, cursista) {
        const existingTeacher = await ProfessorIsFController.verifyExistingTeacher(req.body.login, req.body.inicio)
        
        if (existingTeacher) {
            return {
                error: true,
                teacher: existingTeacher
            }
        }
        
        const { error, user} = await _usuarioController2.default.post(req, res, cursista ? _userTypes2.default.CURSISTA : _userTypes2.default.ISF_TEACHER)

        console.log(user)
        if (error) {
            return {
                error: true,
                teacher: user
            }
        }

        const teacher = await _professorisf2.default.create({
            login: req.body.login,
            poca: req.body.poca,
            inicio: req.body.inicio,
            fim: req.body.fim,
            cursista: cursista
        })

        return {
            error: false,
            teacher: teacher
        }
    }

    async get(_, res){
        const teachers = await _professorisf2.default.findAll({
            include: [
                {
                    model: _usuario2.default,
                    attributes: {
                        include: [
                            [_sequelize.Sequelize.fn('CONCAT_WS', ' ', _sequelize.Sequelize.col('Usuario.nome'), _sequelize.Sequelize.col('Usuario.sobrenome')), 'nomeCompleto'],
                            [_sequelize.Sequelize.fn('CONCAT_WS', '@', _sequelize.Sequelize.col('nomeEmail'), _sequelize.Sequelize.col('dominio')), 'email']
                        ],
                        exclude: ['login', 'senha_encriptada', 'ativo', 'tipo', 'sobrenome', 'dominio', 'nomeEmail']
                    }
                },
                {
                    model: _instituicaoensino2.default,
                    attributes: {
                        exclude: ['idInstituicao']
                    },
                    through: {
                        attributes: ['inicio']
                    },
                }
            ],
            logging: console.log
        })
        
        return res.status(_httpStatus2.default.SUCCESS).json({
            error: false,
            teachers
        })
    }

    async postProeficiencia(req, res) {
        try {
            if(!(req.tipoUsuario === _userTypes2.default.ISF_TEACHER || req.tipoUsuario === _userTypes2.default.CURSISTA)){
                return res.status(403).json({
                    error: _messages_pt2.default.ACCESS_DENIED
                })
            }
    
            const existingProeficiency = await _proeficienciaprofessorisf2.default.findOne({
                where: {
                    login: req.loginUsuario,
                    idioma: req.body.idioma,
                    nivel: req.body.nivel
                }
            })
    
            if(existingProeficiency) {
                return res.status(422).json({
                    error: `${existingProeficiency.nivel} em ${existingProeficiency.idioma} ` + _messages_pt2.default.ALREADY_IN_SYSTEM
                })
            }
    
            const proeficiency = await _proeficienciaprofessorisf2.default.create({
                login: req.loginUsuario,
                nivel: req.body.nivel,
                idioma: req.body.idioma,
                comprovante: req.body.comprovante
            })
    
            return res.status(201).json(proeficiency)   
        } catch (error) {
            return res.status(500).json(_messages_pt2.default.INTERNAL_SERVER_ERROR + error)
        }
    }

    async getMinhaProeficiencia(req, res) {
        try {
            if(!(req.tipoUsuario === _userTypes2.default.ISF_TEACHER || req.tipoUsuario === _userTypes2.default.CURSISTA)){
                return res.status(403).json({
                    error: _messages_pt2.default.ACCESS_DENIED
                })
            }

            const proeficiencies = await _proeficienciaprofessorisf2.default.findAll({
                where: {
                    login: req.loginUsuario
                }
            })

            return res.status(200).json(proeficiencies)
        } catch (error) {
            return res.status(500).json(_messages_pt2.default.INTERNAL_SERVER_ERROR + error)
        }
    }

    async postInstituicao(req, res) {  
        try {
            if(!(req.tipoUsuario === _userTypes2.default.ISF_TEACHER || req.tipoUsuario === _userTypes2.default.CURSISTA)){
                return res.status(403).json({
                    error: _messages_pt2.default.ACCESS_DENIED
                })
            }
    
            const existingDocument = await _comprovanteprofessorinstituicao2.default.findOne({
                where: {
                    login: req.loginUsuario,
                    idInstituicao: req.body.idInstituicao,
                    inicio: req.body.inicio
                }
            })
    
            if(existingDocument) {
                return res.status(409).json({
                    error: `${existingDocument.comprovante} ` + _messages_pt2.default.ALREADY_IN_SYSTEM
                })
            }
            
            const document = await _comprovanteprofessorinstituicao2.default.create({
                idInstituicao: req.body.idInstituicao,
                login: req.loginUsuario,
                inicio: req.body.inicio,
                termino: req.body.termino || null,
                comprovante: req.body.comprovante
            })
    
            return res.status(201).json(document)    
        } catch (error) {
            return res.status(500).json(_messages_pt2.default.INTERNAL_SERVER_ERROR + error)
        }
    }

    async getMinhasInstituicoes(req, res){
        try {
            if(!(req.tipoUsuario === _userTypes2.default.ISF_TEACHER || req.tipoUsuario === _userTypes2.default.CURSISTA)){
                return res.status(403).json({
                    error: _messages_pt2.default.ACCESS_DENIED
                })
            }

            const documents = await _comprovanteprofessorinstituicao2.default.findAll({
                where: {
                    login: req.loginUsuario
                }
            })

            return res.status(200).json(documents)
        } catch (error) {
            return res.status(500).json(_messages_pt2.default.INTERNAL_SERVER_ERROR + error)
        }
    }

    async getInstituicaoAtual(req, res){
        try {
            if(!(req.tipoUsuario === _userTypes2.default.ISF_TEACHER || req.tipoUsuario === _userTypes2.default.CURSISTA)){
                return res.status(403).json({
                    error: _messages_pt2.default.ACCESS_DENIED
                })
            }

            const document = await _comprovanteprofessorinstituicao2.default.findOne({
                where: {
                    login: req.loginUsuario
                }
            })

            return res.status(200).json(document)
        } catch (error) {
            return res.status(500).json(_messages_pt2.default.INTERNAL_SERVER_ERROR + error)
        }
    }
}

exports. default = new ProfessorIsFController()