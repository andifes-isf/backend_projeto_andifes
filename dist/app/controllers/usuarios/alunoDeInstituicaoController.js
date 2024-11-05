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
var _CustomError = require('../../utils/CustomError/CustomError'); var _CustomError2 = _interopRequireDefault(_CustomError);
var _messages_pt = require('../../utils/messages/messages_pt'); var _messages_pt2 = _interopRequireDefault(_messages_pt);
var _httpStatus = require('../../utils/httpStatus/httpStatus'); var _httpStatus2 = _interopRequireDefault(_httpStatus);
var _userTypes = require('../../utils/userType/userTypes'); var _userTypes2 = _interopRequireDefault(_userTypes);

class alunoDeinstituicaoController {
    static verifyAuthorization(userType) {
        if(!(userType === _userTypes2.default.ISF_STUDENT)){
            throw new (0, _CustomError2.default)(_messages_pt2.default.ACCESS_DENIED, _httpStatus2.default.UNAUTHORIZED)
        }
    }

    static async verifyExistingInstitutionStudent(login) {
        const student = await _alunodeinstituicao2.default.findByPk(login)

        if(student) {
            throw new (0, _CustomError2.default)(login + _messages_pt2.default.ALREADY_IN_SYSTEM, _httpStatus2.default.BAD_REQUEST)
        }
    }

    async post(req, res) {
        await _alunoIsFController2.default.post(req, res, 1)

        await alunoDeinstituicaoController.verifyExistingInstitutionStudent(req.loginUsuario)

        const student = await _alunodeinstituicao2.default.create({
            nDocumento: req.body.nDocumento,
            cargo: req.body.cargo,
            areaAtuacao: req.body.areaAtuacao,
            login: req.body.login
        })
    
        return res.status(_httpStatus2.default.CREATED).json(student)
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

        return res.status(_httpStatus2.default.SUCCESS).json(students)
    }

    static async verifyExistingInstitution(institutionId) {
        const institution = await _instituicaoensino2.default.findByPk(institutionId)

        if(!institution) {
            throw new (0, _CustomError2.default)(`Instituição ${institutionId}` + _messages_pt2.default.NOT_FOUND, _httpStatus2.default.BAD_REQUEST)
        }
    }

    static async verifyExistingRegistration(login, institutionId, begin) {
        const existingRegistrantion = await _comprovantealunoinstituicao2.default.findOne({
            where: {
                login: login,
                idInstituicao: institutionId,
                inicio: begin
            }
        })

        if(existingRegistrantion) {
            throw new (0, _CustomError2.default)(existingRegistrantion.comprovante + _messages_pt2.default.ALREADY_IN_SYSTEM, _httpStatus2.default.BAD_REQUEST)
        }
    }

    static async closeRegistration(login, institutionId) {
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

    async postInstituicao(req, res){
        alunoDeinstituicaoController.verifyAuthorization(req.tipoUsuario)

        await alunoDeinstituicaoController.verifyExistingInstitution(req.params.idInstituicao)

        await alunoDeinstituicaoController.verifyExistingRegistration(req.loginUsuario, req.params.idInstituicao, req.body.inicio)

        await alunoDeinstituicaoController.closeRegistration(req.loginUsuario, req.params.idInstituicao)
        
        const registration = await _comprovantealunoinstituicao2.default.create({
            idInstituicao: req.params.idInstituicao,
            login: req.loginUsuario,
            inicio: req.body.inicio,
            comprovante: req.body.comprovante
        })

        return res.status(_httpStatus2.default.CREATED).json(registration)  
    }

    async getMinhasInstituicoes(req, res){
        alunoDeinstituicaoController.verifyAuthorization(req.tipoUsuario)

        const registrations = await _comprovantealunoinstituicao2.default.findAll({
            where: {
                login: req.loginUsuario
            }
        })

        return res.status(_httpStatus2.default.SUCCESS).json(registrations)
    }

    async getInstituicaoAtual(req, res){
        alunoDeinstituicaoController.verifyAuthorization(req.tipoUsuario)

        const registration = await _comprovantealunoinstituicao2.default.findOne({
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

exports. default = new alunoDeinstituicaoController()