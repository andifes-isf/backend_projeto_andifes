"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { newObj[key] = obj[key]; } } } newObj.default = obj; return newObj; } } function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _yup = require('yup'); var Yup = _interopRequireWildcard(_yup);

// Repository
var _IsfStudentRepository = require('../../repositories/user/IsfStudentRepository'); var _IsfStudentRepository2 = _interopRequireDefault(_IsfStudentRepository);

// Controller
// import usuarioController from "../../user/usuarioController"

// Utils
var _messages_pt = require('../../utils/response/messages/messages_pt'); var _messages_pt2 = _interopRequireDefault(_messages_pt);
var _userTypes = require('../../utils/userType/userTypes'); var _userTypes2 = _interopRequireDefault(_userTypes);
var _CustomError = require('../../utils/response/CustomError/CustomError'); var _CustomError2 = _interopRequireDefault(_CustomError);
var _httpStatus = require('../../utils/response/httpStatus/httpStatus'); var _httpStatus2 = _interopRequireDefault(_httpStatus);
var _ErrorType = require('../../utils/response/ErrorType/ErrorType'); var _ErrorType2 = _interopRequireDefault(_ErrorType);

class alunoIsFController {
    // Auxiliar Functions 

    static async postIsFStudent(req, res, from_institution) {
        const existingStudent = await alunoIsFController.verifyExistingObject(_IsfStudentRepository2.default, req.body.login, _messages_pt2.default.EXISTING_ISF_STUDENT)

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

        const student = await _IsfStudentRepository2.default.create({
            login: req.body.login,
            from_institution: from_institution
        })

        return {
            error: false,
            student: student
        }
    }

    static async verifyExistingProeficiency(data) {
        const existingProeficiency = await _IsfStudentRepository2.default.findOneProeficiency(data)

        if(existingProeficiency) {
            return new (0, _CustomError2.default)(
                _messages_pt2.default.EXISTING_PROEFICIENCY + data.language + " " + data.data.level,
                _ErrorType2.default.DUPLICATE_ENTRY
            )
        }
    }

    // Endpoints

    /**
    *
    * @route GET /isf_student
    * 
    * RETORNO
    * @returns {int} httpStatus - The value might be:
    * 200 - SUCCESS
    * 500 - INTERNAL_SERVER_ERROR
    * @returns {boolean} error
    * 
    * if return an error
    * @returns {string} message - error's message
    * @returns {string} errorName - error's name
    * 
    * if return successfully
    * @returns {AlunoIsF} data
    */
    async get(_, res){
        const students = await _IsfStudentRepository2.default.findAll()

        return res.status(_httpStatus2.default.SUCCESS).json({
            error: false,
            students
        })
    }

    /**
    *
    * @requires Authentication
    * @route POST /isf_student/proeficiency
    * 
    * @param {char[2]} level - The level of the proeficiency. 
    * For japanese, it should be used N5 -> N1
    * For other languages, it should be used A1 -> C2
    * @param {string} language - Indicates the language of the proeficiency. It must be one of the follow:
    * 1 - "ingles"
    * 2 - "portugues",
    * 3 - "alemao"
    * 4 - "frances"
    * 5 - "italiano"
    * 6 - "espanhol"
    * 7 - "japones"
    * @param {string} document - Document that proves the proeficiency
    * 
    * RETORNO
    * @returns {int} httpStatus - The value might be:
    * 201 - CREATED
    * 400 - BAD_REQUEST
    * 401 - UNAUTHORIZED
    * 500 - INTERNAL_SERVER_ERROR
    * @returns {boolean} error
    * 
    * if return an error
    * @returns {string} message - error's message
    * @returns {string} errorName - error's name
    * 
    * if return successfully
    * @returns {proeficienciaAlunoIsF} data
    */  
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
        const data = {
            userLogin = userLogin,
            language,
            level,
            document
        } = req.body

        const existingProeficiencyError = await alunoIsFController.verifyExistingProeficiency(data)

        if (existingProeficiencyError) {
            return res.status(_httpStatus2.default.BAD_REQUEST).json({
                error: true,
                message: existingProeficiencyError.message,
                errorName: existingProeficiencyError.name
            })
        }

        const proeficiency = await _IsfStudentRepository2.default.createProeficiency(data)

        return res.status(_httpStatus2.default.CREATED).json({
            error: false,
            proeficiency
        })
    }

    /**
    *
    * @requires Authentication
    * @route GET /isf_student/my_proeficiency
    * 
    * RETORNO
    * @returns {int} httpStatus - The value might be:
    * 200 - SUCCESS
    * 401 - UNAUTHORIZED
    * 500 - INTERNAL_SERVER_ERROR
    * @returns {boolean} error
    * 
    * if return an error
    * @returns {string} message - error's message
    * @returns {string} errorName - error's name
    * 
    * if return successfully
    * @returns {proeficienciaAlunoIsF[]} data
    */
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

        const proeficiencies = await _IsfStudentRepository2.default.findAllProeficiencyForStudent(req.loginUsuario)

        return res.status(_httpStatus2.default.SUCCESS).json({
            error: false,
            proeficiencies
        })
    }
}

exports. default = alunoIsFController