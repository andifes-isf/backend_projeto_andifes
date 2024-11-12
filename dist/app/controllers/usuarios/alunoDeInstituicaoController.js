"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { newObj[key] = obj[key]; } } } newObj.default = obj; return newObj; } } function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _yup = require('yup'); var Yup = _interopRequireWildcard(_yup);

// Models
var _alunodeinstituicao = require('../../models/usuarios/alunodeinstituicao'); var _alunodeinstituicao2 = _interopRequireDefault(_alunodeinstituicao);
var _alunoisf = require('../../models/usuarios/alunoisf'); var _alunoisf2 = _interopRequireDefault(_alunoisf);
var _comprovantealunoinstituicao = require('../../models/usuario_pertence_instituicao/comprovantealunoinstituicao'); var _comprovantealunoinstituicao2 = _interopRequireDefault(_comprovantealunoinstituicao);
var _instituicaoensino = require('../../models/instituicao/instituicaoensino'); var _instituicaoensino2 = _interopRequireDefault(_instituicaoensino);
var _usuario = require('../../models/usuarios/usuario'); var _usuario2 = _interopRequireDefault(_usuario);

// Controller
var _alunoIsFController = require('./alunoIsFController'); var _alunoIsFController2 = _interopRequireDefault(_alunoIsFController);

// Utils
var _sequelize = require('sequelize');
var _CustomError = require('../../utils/response/CustomError/CustomError'); var _CustomError2 = _interopRequireDefault(_CustomError);
var _messages_pt = require('../../utils/response/messages/messages_pt'); var _messages_pt2 = _interopRequireDefault(_messages_pt);
var _httpStatus = require('../../utils/response/httpStatus/httpStatus'); var _httpStatus2 = _interopRequireDefault(_httpStatus);
var _userTypes = require('../../utils/userType/userTypes'); var _userTypes2 = _interopRequireDefault(_userTypes);
var _ErrorType = require('../../utils/response/ErrorType/ErrorType'); var _ErrorType2 = _interopRequireDefault(_ErrorType);

class alunoDeinstituicaoController extends _alunoIsFController2.default {
    // Auxiliar Functions

    static async verifyExistingRegistration(login, institutionId, begin) {
        const existingRegistrantion = await _comprovantealunoinstituicao2.default.findOne({
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
        const registration = await _comprovantealunoinstituicao2.default.findOne({
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

    async post(req, res) {
        const existingStudent = await alunoDeinstituicaoController.verifyExistingObject(_alunodeinstituicao2.default, req.body.nDocumento, _messages_pt2.default.EXISTING_INSTITUTION_STUDENT)
        
        if (existingStudent) {
            return res.status(_httpStatus2.default.BAD_REQUEST).json({
                error: true,
                message: existingStudent.message,
                errorName: existingStudent.name
            })
        }

        const { error, student } = await _alunoIsFController2.default.postIsFStudent(req, res, 1)

        if (error) {
            return res.status(_httpStatus2.default.BAD_REQUEST).json({
                error: true,
                message: student.message,
                errorName: student.name
            })
        }

        const institutionStudent = await _alunodeinstituicao2.default.create({
            nDocumento: req.body.nDocumento,
            cargo: req.body.cargo,
            areaAtuacao: req.body.areaAtuacao,
            login: req.body.login
        })
    
        return res.status(_httpStatus2.default.CREATED).json({
            error: false,
            institutionStudent
        })
    }

    async get(_, res) {
        const students = await _alunodeinstituicao2.default.findAll({
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
                    as: "institution",
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

        return res.status(_httpStatus2.default.SUCCESS).json({
            error: false,
            students
        })
    }

    async postInstituicao(req, res){
        const userType = req.tipoUsuario

        const authorizationError = _alunoIsFController2.default.verifyUserType([_userTypes2.default.ISF_STUDENT], userType)
        
        if (authorizationError) {
            return res.status(_httpStatus2.default.UNAUTHORIZED).json({
                error: true,
                message: authorizationError.message,
                errorName: authorizationError.name
            })
        }

        // Seria bom ver como mudar para que fosse passado o nome, ou sigla, da instituição, ao invés do Id dela

        const existingInstitution = await alunoDeinstituicaoController.verifyExistingObject(_instituicaoensino2.default, req.params.idInstituicao, _messages_pt2.default.EXISTING_INSTITUTION)

        if (!existingInstitution) {
            return res.status(_httpStatus2.default.BAD_REQUEST).json({
                error: true,
                message: existingInstitution.message,
                errorName: existingInstitution.name
            })
        }

        const existingRegistration = await alunoDeinstituicaoController.verifyExistingRegistration(req.loginUsuario, req.params.idInstituicao, req.body.inicio)

        if (existingRegistration) {
            return res.status(_httpStatus2.default.BAD_REQUEST).json({
                error: true,
                message: existingRegistration.message,
                errorName: existingRegistration.name
            })
        }

        await alunoDeinstituicaoController.closeRegistration(req.loginUsuario, req.params.idInstituicao)
        
        const registration = await _comprovantealunoinstituicao2.default.create({
            idInstituicao: req.params.idInstituicao,
            login: req.loginUsuario,
            inicio: req.body.inicio,
            comprovante: req.body.comprovante
        })

        return res.status(_httpStatus2.default.CREATED).json({
            error: false,
            registration
        })  
    }

    async getMinhasInstituicoes(req, res){
        const userType = req.tipoUsuario

        const authorizationError = _alunoIsFController2.default.verifyUserType([_userTypes2.default.ISF_STUDENT], userType)
        
        if (authorizationError) {
            return res.status(_httpStatus2.default.UNAUTHORIZED).json({
                error: true,
                message: authorizationError.message,
                errorName: authorizationError.name
            })
        }

        const registrations = await _comprovantealunoinstituicao2.default.findAll({
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

        const authorizationError = _alunoIsFController2.default.verifyUserType([_userTypes2.default.ISF_STUDENT], userType)
        
        if (authorizationError) {
            return res.status(_httpStatus2.default.UNAUTHORIZED).json({
                error: true,
                message: authorizationError.message,
                errorName: authorizationError.name
            })
        }

        const registration = await _comprovantealunoinstituicao2.default.findOne({
            where: {
                login: req.loginUsuario,
                termino: {
                    [_sequelize.Op.is]: null
                }
            }
        })

        return res.status(_httpStatus2.default.SUCCESS).json({
            error: false,
            registration
        })
    }
}

exports. default = new alunoDeinstituicaoController()