"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }// Models
var _alunograduacao = require('../../models/usuarios/alunograduacao'); var _alunograduacao2 = _interopRequireDefault(_alunograduacao);
var _usuario = require('../../models/usuarios/usuario'); var _usuario2 = _interopRequireDefault(_usuario);
var _professorisf = require('../../models/usuarios/professorisf'); var _professorisf2 = _interopRequireDefault(_professorisf);
// import ProfessorIsFController from './professorIsFController'

// Utils
var _messages_pt = require('../../utils/response/messages/messages_pt'); var _messages_pt2 = _interopRequireDefault(_messages_pt);
var _CustomError = require('../../utils/response/CustomError/CustomError'); var _CustomError2 = _interopRequireDefault(_CustomError);
var _ErrorType = require('../../utils/response/ErrorType/ErrorType'); var _ErrorType2 = _interopRequireDefault(_ErrorType);
var _httpStatus = require('../../utils/response/httpStatus/httpStatus'); var _httpStatus2 = _interopRequireDefault(_httpStatus);

class AlunoGraduacaoController {

    /**
    *
    * @route POST /graduation_student
    * 
    * @param {string} req.body.login
    * 
    * 
    * RETORNO
    * @returns {int} httpStatus - The value might be:
    * 201 - CREATED
    * 400 - BAD_REQUEST
    * 500 - INTERNAL_SERVER_ERROR
    * @returns {boolean} error
    * 
    * if return an error
    * @returns {string} message - error's message
    * @returns {string} errorName - error's name
    * 
    * if return successfully
    * @returns {AlunoGraduacao} data
    */
    async post(req, res) {
        const existingGraduationStudent = await AlunoGraduacaoController.verifyExistingObject(_alunograduacao2.default, req.body.login, _messages_pt2.default.EXISTING_GRADUATION_STUDENT)

        if (existingGraduationStudent) {
            return res.status(_httpStatus2.default.BAD_REQUEST).json({
                error: true,
                message: existingGraduationStudent.message,
                errorName: existingGraduationStudent.name
            })
        }

        const { error, teacher } = await AlunoGraduacaoController.postIsFTeacher(req, res, 0)
        
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
            graduationStudent
        })

    }

    /**
     * 
     * @route GET /graduation_student
     * 
     * @returns {int} httpStatus - The value might be:
     * 200 - SUCCESS
     * 500 - INTERNAL_SERVER_ERROR
     * 
     * if return an error
     * @returns {string} message - error's message
     * @returns {string} errorName - error's name
     * 
     * if return successfully
     * @returns {AlunoGraduacao} data
     */
    async get(_, res){
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
        
        return res.status(_httpStatus2.default.SUCCESS).json({
            error: false,
            graduationStudents
        })
    }
}

exports. default = new AlunoGraduacaoController()