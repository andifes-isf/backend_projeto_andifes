"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { newObj[key] = obj[key]; } } } newObj.default = obj; return newObj; } } function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _yup = require('yup'); var Yup = _interopRequireWildcard(_yup);

// Models
var _alunoestrangeiro = require('../../models/usuarios/alunoestrangeiro'); var _alunoestrangeiro2 = _interopRequireDefault(_alunoestrangeiro);
var _alunoIsFController = require('./alunoIsFController'); var _alunoIsFController2 = _interopRequireDefault(_alunoIsFController);
var _alunoisf = require('../../models/usuarios/alunoisf'); var _alunoisf2 = _interopRequireDefault(_alunoisf);
// import Usuario from '../../models/usuarios/usuario'

// Utils
var _messages_pt = require('../../utils/response/messages/messages_pt'); var _messages_pt2 = _interopRequireDefault(_messages_pt);
var _CustomError = require('../../utils/response/CustomError/CustomError'); var _CustomError2 = _interopRequireDefault(_CustomError);
var _httpStatus = require('../../utils/response/httpStatus/httpStatus'); var _httpStatus2 = _interopRequireDefault(_httpStatus);
var _ErrorType = require('../../utils/response/ErrorType/ErrorType'); var _ErrorType2 = _interopRequireDefault(_ErrorType);

class alunoEstrangeiroController  {
    // Endpoints

    /**
     *
     * @route POST /foreign_student
     * 
     * @param {string} req.body.home_country - User's homes country
     * @param {int} req.body.register - User's register (not specified because each country has it's own personal register)
     * @param {int} req.body.type - User's register's type
     * @param {string} req.body.code - User's register code
     * @param {string} req.body.login - User's login 
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
     * @returns {AlunoEstrangeiro} data
     */  
    async post(req, res) {
        const existingStudent = await alunoEstrangeiroController.verifyExistingObject(_alunoestrangeiro2.default, req.body.login, _messages_pt2.default.EXISTING_FOREIGN_STUDENT)
        
        if (existingStudent) {
            return res.status(_httpStatus2.default.BAD_REQUEST).json({
                error: true,
                message: existingStudent.message,
                errorName: existingStudent.name
            })
        }

        const { error, student } = await alunoEstrangeiroController.postIsFStudent(req, res, 0)

        if (error) {
            return res.status(_httpStatus2.default.BAD_REQUEST).json({
                error: true,
                message: student.message,
                errorName: student.name
            })
        }

        const { home_country, register, type, login, code } = req.body

        const foreignStudent = await _alunoestrangeiro2.default.create({
            home_country: home_country,
            register: register,
            type: type,
            login: login,
            code: code
        })
    
        return res.status(_httpStatus2.default.CREATED).json({
            error: false,
            foreignStudent
        })
    }

    /**
    *
    * @route GET /foreign_student
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
    * @returns {AlunoEstrangeiro[]} data
    */
    async get(_, res) {
        const students = await _alunoestrangeiro2.default.findAll({
            include: [
                {
                    model: _alunoisf2.default,
                    attributes: {
                        exclude: ['login']
                    },
                    include: [{
                        model: Usuario,
                        attributes: {
                            exclude: ['login', 'senha_encriptada', 'ativo', 'tipo']
                        }
                    }]
                }
            ]
        })

        return res.status(_httpStatus2.default.SUCCESS).json({
            error: false,
            students
        })
    }
}

exports. default = new alunoEstrangeiroController()