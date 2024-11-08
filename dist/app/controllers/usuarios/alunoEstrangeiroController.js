"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { newObj[key] = obj[key]; } } } newObj.default = obj; return newObj; } } function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _yup = require('yup'); var Yup = _interopRequireWildcard(_yup);

// Models
var _alunoestrangeiro = require('../../models/usuarios/alunoestrangeiro'); var _alunoestrangeiro2 = _interopRequireDefault(_alunoestrangeiro);
var _alunoIsFController = require('./alunoIsFController'); var _alunoIsFController2 = _interopRequireDefault(_alunoIsFController);
var _alunoisf = require('../../models/usuarios/alunoisf'); var _alunoisf2 = _interopRequireDefault(_alunoisf);
var _usuario = require('../../models/usuarios/usuario'); var _usuario2 = _interopRequireDefault(_usuario);

// Utils
var _messages_pt = require('../../utils/messages/messages_pt'); var _messages_pt2 = _interopRequireDefault(_messages_pt);
var _CustomError = require('../../utils/CustomError/CustomError'); var _CustomError2 = _interopRequireDefault(_CustomError);
var _httpStatus = require('../../utils/httpStatus/httpStatus'); var _httpStatus2 = _interopRequireDefault(_httpStatus);
var _ErrorType = require('../../utils/response/ErrorType/ErrorType'); var _ErrorType2 = _interopRequireDefault(_ErrorType);

class alunoEstrangeiroController {
    static async verifyExistingStudent(login) {
        const existingStudent = await _alunoestrangeiro2.default.findOne({
            where: {
                login: login
            }
        })

        if(existingStudent) {
            return new (0, _CustomError2.default)(
                `${existingStudent.login}` + _messages_pt2.default.ALREADY_IN_SYSTEM,
                _ErrorType2.default.DUPLICATE_ENTRY
            )
        }
    }

    async post(req, res) {
        const existingStudent = await alunoEstrangeiroController.verifyExistingStudent(req.body.login)
        
        if (existingStudent) {
            return res.status(_httpStatus2.default.BAD_REQUEST).json({
                error: true,
                message: existingStudent.message,
                errorName: existingStudent.name
            })
        }

        const { error, student } = await _alunoIsFController2.default.post(req, res, 0)

        if (error) {
            return res.status(_httpStatus2.default.BAD_REQUEST).json({
                error: true,
                message: student.message,
                errorName: student.name
            })
        }

        const foreignStudent = await _alunoestrangeiro2.default.create({
            paisOrigem: req.body.paisOrigem,
            comprovante: req.body.comprovante,
            tipo: req.body.tipo,
            login: req.body.login,
            codigo: req.body.codigo
        })
    
        return res.status(_httpStatus2.default.CREATED).json({
            error: false,
            foreignStudent
        })
    }

    async get(_, res) {
        const alunos = await _alunoestrangeiro2.default.findAll({
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
                }
            ]
        })

        return res.status(_httpStatus2.default.SUCCESS).json(alunos)
    }
}

exports. default = new alunoEstrangeiroController()