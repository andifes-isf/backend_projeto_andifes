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


class ProfessorIsFController extends _usuarioController2.default {
    // Auxiliar Functions

    static async postIsFTeacher(req, res, cursista) {
        const existingTeacher = await ProfessorIsFController.verifyExistingObject(_professorisf2.default, req.body.login, _messages_pt2.default.EXISTING_ISF_TEACHER)

        if (existingTeacher) {
            return {
                error: true,
                teacher: existingTeacher
            }
        }
        
        const { error, user} = await _usuarioController2.default.postUser(req, res, cursista ? _userTypes2.default.CURSISTA : _userTypes2.default.ISF_TEACHER)

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

    static async verifyExistingProeficiency(login, language, level) {
        const existingProeficiency = await _proeficienciaprofessorisf2.default.findOne({
            where: {
                login: login,
                idioma: language,
                nivel: level
            }
        })

        if(existingProeficiency) {
            return new (0, _CustomError2.default)(
                _messages_pt2.default.EXISTING_PROEFICIENCY + language + " " +  level,
                _ErrorType2.default.DUPLICATE_ENTRY
            )
        }
    }

    static async verifyExistingRegistration(login, institutionId, begin) {
        const existingRegistrantion = await _comprovanteprofessorinstituicao2.default.findOne({
            where: {
                login: login,
                idInstituicao: institutionId,
                inicio: begin
            }
        })

        if(existingRegistrantion) {
            return new (0, _CustomError2.default)(
                _messages_pt2.default.EXISTING_INSTITUTION_USER_RELATIONSHIP + institutionId,
                _ErrorType2.default.DUPLICATE_ENTRY
            )
        }
    }

    static async closeRegistration(login) {
        const registration = await _comprovanteprofessorinstituicao2.default.findOne({
            where: {
                login: login,
                termino: {
                    [_sequelize.Op.is]: null
                }
            }
        })

        registration.termino = new Date().toISOString().split("T")[0]
        registration.save()
    }

    // Endpoints

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
        const userType = req.tipoUsuario

        const authorizationError = ProfessorIsFController.verifyUserType([_userTypes2.default.ISF_TEACHER, _userTypes2.default.CURSISTA], userType)

        if (authorizationError) {
            return res.status(_httpStatus2.default.UNAUTHORIZED).json({
                error: true,
                message: authorizationError.message,
                errorName: authorizationError.name
            })
        }

        const userLogin = req.loginUsuario
        const { language, level, document } = req.body

        const existingProeficiencyError = await ProfessorIsFController.verifyExistingProeficiency(userLogin, language, level)

        if(existingProeficiencyError) {
            return res.status(_httpStatus2.default.BAD_REQUEST).json({
                error: true,
                message: existingProeficiencyError.message,
                errorName: existingProeficiencyError.name
            })
        }

        const proeficiency = await _proeficienciaprofessorisf2.default.create({
            login: userLogin,
            nivel: level,
            idioma: language,
            comprovante: document
        })

        return res.status(_httpStatus2.default.CREATED).json({
            error: false,
            proeficiency
        })  
    }

    async getMinhaProeficiencia(req, res) {
        const userType = req.tipoUsuario

        const authorizationError = ProfessorIsFController.verifyUserType([_userTypes2.default.ISF_TEACHER, _userTypes2.default.CURSISTA], userType)

        if (authorizationError) {
            return res.status(_httpStatus2.default.UNAUTHORIZED).json({
                error: true,
                message: authorizationError.message,
                errorName: authorizationError.name
            })
        }

        const proeficiencies = await _proeficienciaprofessorisf2.default.findAll({
            where: {
                login: req.loginUsuario
            }
        })

        return res.status(_httpStatus2.default.SUCCESS).json({
            error: false,
            proeficiencies
        })
    }

    async postInstituicao(req, res) { 
        const userType = req.tipoUsuario

        const authorizationError = ProfessorIsFController.verifyUserType([_userTypes2.default.ISF_TEACHER, _userTypes2.default.CURSISTA], userType)

        if (authorizationError) {
            return res.status(_httpStatus2.default.UNAUTHORIZED).json({
                error: true,
                message: authorizationError.message,
                errorName: authorizationError.name
            })
        }

        const existingInstitution = await ProfessorIsFController.verifyExistingObject(_instituicaoensino2.default, req.params.idInstituicao, _messages_pt2.default.EXISTING_INSTITUTION)

        if(!existingInstitution) {
            return res.status(_httpStatus2.default.BAD_REQUEST).json({
                error: true,
                message: _messages_pt2.default.INSTITUTION_NOT_FOUNDED + req.params.idInstituicao,
                errorName: _ErrorType2.default.NOT_FOUND
            })
        }

        const existingRegistration = await ProfessorIsFController.verifyExistingRegistration(req.loginUsuario, req.params.idInstituicao, req.body.inicio)

        if (existingRegistration) {
            return res.status(_httpStatus2.default.BAD_REQUEST).json({
                error: true,
                message: existingRegistration.message,
                errorName: existingRegistration.name
            })
        }

        await ProfessorIsFController.closeRegistration(req.loginUsuario, req.params.idInstituicao)

        const registration = await _comprovanteprofessorinstituicao2.default.create({
            idInstituicao: req.params.idInstituicao,
            login: req.loginUsuario,
            inicio: req.body.inicio,
            termino: req.body.termino || null,
            comprovante: req.body.comprovante
        })

        return res.status(_httpStatus2.default.CREATED).json({
            error: false,
            registration
        })    
    }

    async getMinhasInstituicoes(req, res){
        const userType = req.tipoUsuario

        const authorizationError = ProfessorIsFController.verifyUserType([_userTypes2.default.ISF_TEACHER, _userTypes2.default.CURSISTA], userType)

        if (authorizationError) {
            return res.status(_httpStatus2.default.UNAUTHORIZED).json({
                error: true,
                message: authorizationError.message,
                errorName: authorizationError.name
            })
        }

        const registrations = await _comprovanteprofessorinstituicao2.default.findAll({
            where: {
                login: req.loginUsuario
            }
        })

        return res.status(_httpStatus2.default.SUCCESS).json({
            error: false,
            registrations
        })
    }

    async getInstituicaoAtual(req, res){
        const userType = req.tipoUsuario

        const authorizationError = ProfessorIsFController.verifyUserType([_userTypes2.default.ISF_TEACHER, _userTypes2.default.CURSISTA], userType)

        if (authorizationError) {
            return res.status(_httpStatus2.default.UNAUTHORIZED).json({
                error: true,
                message: authorizationError.message,
                errorName: authorizationError.name
            })
        }

        const registration = await _comprovanteprofessorinstituicao2.default.findOne({
            where: {
                login: req.loginUsuario,
                termino: {
                    [_sequelize.Op.is]: null
                }
            }
        })

        return res.status(_httpStatus2.default.SUCCESS).json(registration)
    }
}

exports. default = new ProfessorIsFController()