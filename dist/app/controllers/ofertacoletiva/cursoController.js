"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }// Models
var _curso = require('../../models/ofertacoletiva/curso'); var _curso2 = _interopRequireDefault(_curso);

// Utils
var _httpStatus = require('../../utils/response/httpStatus/httpStatus'); var _httpStatus2 = _interopRequireDefault(_httpStatus);
var _messages_pt = require('../../utils/response/messages/messages_pt'); var _messages_pt2 = _interopRequireDefault(_messages_pt);
var _CustomError = require('../../utils/response/CustomError/CustomError'); var _CustomError2 = _interopRequireDefault(_CustomError);

class cursoController {
    static async verifyExistingCourse(name) {
        const existingCourse = await _curso2.default.findOne({
            where: {
                nome: name
            }
        })

        if(existingCourse) {
            throw new (0, _CustomError2.default)(name + _messages_pt2.default.ALREADY_IN_SYSTEM, _httpStatus2.default.BAD_REQUEST)
        }
    }

    async post(req, res) {
        await cursoController.verifyExistingCourse(req.body.nome)

        const course = await _curso2.default.create({
            nome: req.body.nome,
            idioma: req.body.idioma,
            categoria: req.body.categoria,
            nivel: req.body.nivel,
            cargaHoraria: req.body.cargaHoraria,
            ementa: req.body.ementa,
            justificativa: req.body.justificativa,
            objetivos: req.body.objetivos,
            metodologia: req.body.metodologia,
            descricaoAvaliacao: req.body.descricaoAvaliacao,
            aspectosFuncionais: req.body.aspectosFuncionais,
            aspectosInterculturais: req.body.aspectosInterculturais,
            aspectosLinguisticos: req.body.aspectosLinguisticos
        })

        return res.status(_httpStatus2.default.CREATED).json(course)
    }

    async get(_, res) {
        const courses = await _curso2.default.findAll()

        return res.status(_httpStatus2.default.SUCCESS).json(courses)
    }
}

exports. default = new cursoController()