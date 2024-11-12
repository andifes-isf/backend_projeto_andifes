"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { newObj[key] = obj[key]; } } } newObj.default = obj; return newObj; } } function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _yup = require('yup'); var Yup = _interopRequireWildcard(_yup);

// Models
var _alunoisf = require('../../models/usuarios/alunoisf'); var _alunoisf2 = _interopRequireDefault(_alunoisf);
var _curso = require('../../models/ofertacoletiva/curso'); var _curso2 = _interopRequireDefault(_curso);
var _proeficienciaalunoisf = require('../../models/proeficiencia/proeficienciaalunoisf'); var _proeficienciaalunoisf2 = _interopRequireDefault(_proeficienciaalunoisf);
var _turmaoc = require('../../models/ofertacoletiva/turmaoc'); var _turmaoc2 = _interopRequireDefault(_turmaoc);

// Controller
var _usuarioController = require('./usuarioController'); var _usuarioController2 = _interopRequireDefault(_usuarioController);

// Utils
var _messages_pt = require('../../utils/response/messages/messages_pt'); var _messages_pt2 = _interopRequireDefault(_messages_pt);
var _userTypes = require('../../utils/userType/userTypes'); var _userTypes2 = _interopRequireDefault(_userTypes);
var _CustomError = require('../../utils/response/CustomError/CustomError'); var _CustomError2 = _interopRequireDefault(_CustomError);
var _httpStatus = require('../../utils/response/httpStatus/httpStatus'); var _httpStatus2 = _interopRequireDefault(_httpStatus);
var _ErrorType = require('../../utils/response/ErrorType/ErrorType'); var _ErrorType2 = _interopRequireDefault(_ErrorType);

class alunoIsFController extends _usuarioController2.default {
    // Auxiliar Functions 

    static async postIsFStudent(req, res, deInstituicao) {
        const existingStudent = await alunoIsFController.verifyExistingObject(_alunoisf2.default, req.body.login, _messages_pt2.default.EXISTING_ISF_STUDENT)

        if (existingStudent) {
            return {
                error: true,
                student: existingStudent
            }
        }
        
        const { error, user } = await alunoIsFController.postUser(req, res, _userTypes2.default.ISF_STUDENT)
        
        if (error) {
            return {
                error: true,
                student: user
            }
        }

        const student = await _alunoisf2.default.create({
            login: req.body.login,
            deInstituicao: deInstituicao
        })

        return {
            error: false,
            student: student
        }
    }

    static async verifyExistingProeficiency(login, language, level) {
        const existingProeficiency = await _proeficienciaalunoisf2.default.findOne({
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

    // Endpoints

    async get(_, res){
        const students = await _alunoisf2.default.findAll({
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

        return res.status(_httpStatus2.default.SUCCESS).json({
            error: false,
            students
        })
    }

    async postProeficiencia(req, res) {
        const userType = req.tipoUsuario

        const authorizationError = alunoIsFController.verifyUserType([_userTypes2.default.ISF_STUDENT], userType)

        if (authorizationError) {
            return res.status(_httpStatus2.default.UNAUTHORIZED).json({
                error: true,
                message: authorizationError.message,
                errorName: authorizationError.name
            })
        }

        const userLogin = req.loginUsuario
        const { language, level, document } = req.body

        const existingProeficiencyError = await alunoIsFController.verifyExistingProeficiency(userLogin, language, level)

        if (existingProeficiencyError) {
            return res.status(_httpStatus2.default.BAD_REQUEST).json({
                error: true,
                message: existingProeficiencyError.message,
                errorName: existingProeficiencyError.name
            })
        }

        const proeficiency = await _proeficienciaalunoisf2.default.create({
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

        const authorizationError = alunoIsFController.verifyUserType([_userTypes2.default.ISF_STUDENT], userType)
    
        if (authorizationError) {
            return res.status(401).json({
                error: true,
                message: authorizationError.message,
                errorName: authorizationError.name
            })
        }

        const proeficiencies = await _proeficienciaalunoisf2.default.findAll({
            where: {
                login: req.loginUsuario
            }
        })

        return res.status(_httpStatus2.default.SUCCESS).json({
            error: false,
            proeficiencies
        })
    }
}

exports. default = alunoIsFController