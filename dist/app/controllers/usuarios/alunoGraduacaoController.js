"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }// Models
var _alunograduacao = require('../../models/usuarios/alunograduacao'); var _alunograduacao2 = _interopRequireDefault(_alunograduacao);
var _usuario = require('../../models/usuarios/usuario'); var _usuario2 = _interopRequireDefault(_usuario);
var _professorisf = require('../../models/usuarios/professorisf'); var _professorisf2 = _interopRequireDefault(_professorisf);
var _professorIsFController = require('./professorIsFController'); var _professorIsFController2 = _interopRequireDefault(_professorIsFController);

// Utils
var _messages_pt = require('../../utils/messages/messages_pt'); var _messages_pt2 = _interopRequireDefault(_messages_pt);
var _CustomError = require('../../utils/response/CustomError/CustomError'); var _CustomError2 = _interopRequireDefault(_CustomError);
var _ErrorType = require('../../utils/response/ErrorType/ErrorType'); var _ErrorType2 = _interopRequireDefault(_ErrorType);
var _httpStatus = require('../../utils/response/httpStatus/httpStatus'); var _httpStatus2 = _interopRequireDefault(_httpStatus);

class AlunoGraduacaoController {
    static async verifyExistingGraduationStudent(login) {
        const existingGraduationStudent = await _alunograduacao2.default.findOne({
            where: {
                login: login
            }
        })

        if(existingGraduationStudent) {
            return new (0, _CustomError2.default)(
                `${existingGraduationStudent.login} ` + _messages_pt2.default.ALREADY_IN_SYSTEM,
                _ErrorType2.default.DUPLICATE_ENTRY
            )
        }
    }

    async post(req, res) {
        const existingGraduationStudent = await AlunoGraduacaoController.verifyExistingGraduationStudent(req.body.login)

        if (existingGraduationStudent) {
            return res.status(_httpStatus2.default.BAD_REQUEST).json({
                error: true,
                message: existingGraduationStudent.message,
                errorName: existingGraduationStudent.name
            })
        }

        const { error, teacher } = await _professorIsFController2.default.post(req, res, 0)
        
        if (error) {
            return res.status(_httpStatus2.default.BAD_REQUEST).json({
                error: true,
                message: teacher.message,
                errorName: teacher.name
            })
        }

        const graduationStudent = await _alunograduacao2.default.create({
            login: req.body.login
        })

        return res.status(_httpStatus2.default.CREATED).json({
            error: false,
            teacher
        })

    }

    async get(_, res){
        try {
            const graduationStudents = await _alunograduacao2.default.findAll({
                include: [
                    {
                        model: _professorisf2.default,
                        where: {
                            cursista: false
                        }
                    }
                ]
            })
            
            return res.status(200).json(graduationStudents)
            
        } catch (error) {
            console.log(error)
            return res.status(500).json(_messages_pt2.default.INTERNAL_SERVER_ERROR + error)
        }

    }
}

exports. default = new AlunoGraduacaoController()