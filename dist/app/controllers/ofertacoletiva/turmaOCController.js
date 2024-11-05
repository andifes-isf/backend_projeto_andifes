"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }// Models
var _turmaoc = require('../../models/ofertacoletiva/turmaoc'); var _turmaoc2 = _interopRequireDefault(_turmaoc);
var _curso = require('../../models/ofertacoletiva/curso'); var _curso2 = _interopRequireDefault(_curso);
var _professorisf = require('../../models/usuarios/professorisf'); var _professorisf2 = _interopRequireDefault(_professorisf);

// Utils
var _userTypes = require('../../utils/userType/userTypes'); var _userTypes2 = _interopRequireDefault(_userTypes);
var _httpStatus = require('../../utils/httpStatus/httpStatus'); var _httpStatus2 = _interopRequireDefault(_httpStatus);
var _messages_pt = require('../../utils/messages/messages_pt'); var _messages_pt2 = _interopRequireDefault(_messages_pt);
var _CustomError = require('../../utils/CustomError/CustomError'); var _CustomError2 = _interopRequireDefault(_CustomError);

class turmaOCController {
    static async verifyExistingClass(name) {
        const existingClass = await _turmaoc2.default.findOne({
            where: {
                nome: name
            }
        })

        if(existingClass) {
            throw new (0, _CustomError2.default)(name + _messages_pt2.default.ALREADY_IN_SYSTEM, _httpStatus2.default.BAD_REQUEST)
        }
    }

    async post(req, res) {        
        // verificar quem mais pode criar uma turma
        if(!(req.tipoUsuario === _userTypes2.default.CURSISTA || req.tipoUsuario === _userTypes2.default.ISF_TEACHER)) {
            throw new (0, _CustomError2.default)(_messages_pt2.default.ACCESS_DENIED, _httpStatus2.default.UNAUTHORIZED)
        }

        await turmaOCController.verifyExistingClass(req.body.nome)

        const classObject = await _turmaoc2.default.create({
            idCurso: req.body.idCurso,
            nVagas: req.body.nVagas,
            nome: req.body.nome,
            nInscritos: req.body.nInscritos,
            nConcluintes: req.body.nConcluintes,
            nReprovados: req.body.nReprovados,
        })

        return res.status(201).json(classObject)
    }

    async get(_, res) {
        const classes = await _turmaoc2.default.findAll({
            include: [
                {
                    model: _curso2.default,
                    attributes: ['nome', 'idioma', 'categoria', 'nivel', 'cargaHoraria']
                },
                {
                    model: _professorisf2.default,
                    attributes: {
                        exclude: ['poca']
                    },
                    through: {
                        attributes: {
                            exclude: ['login', 'idTurma'],
                            include: ['inicio', 'termino']
                        }
                    }
                }
            ],
            order: [
                ['idCurso', 'ASC'],
                ['idTurma', 'ASC']
            ]
        })

        return res.status(_httpStatus2.default.SUCCESS).json(classes)
    }

}

exports. default = new turmaOCController()