"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { newObj[key] = obj[key]; } } } newObj.default = obj; return newObj; } } function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _yup = require('yup'); var Yup = _interopRequireWildcard(_yup);

// Models
var _disciplinaespecializacao = require('../../models/curso_especializacao/disciplinaespecializacao'); var _disciplinaespecializacao2 = _interopRequireDefault(_disciplinaespecializacao);

// Utils
var _messages_pt = require('../../utils/messages/messages_pt'); var _messages_pt2 = _interopRequireDefault(_messages_pt);
var _CustomError = require('../../utils/CustomError/CustomError'); var _CustomError2 = _interopRequireDefault(_CustomError);
var _httpStatus = require('../../utils/httpStatus/httpStatus'); var _httpStatus2 = _interopRequireDefault(_httpStatus);

class disciplinaEspecializacaoController {
    async post(req, res){
        const existingDiscipline = await _disciplinaespecializacao2.default.findOne({
            where: {
                nome: req.body.nome
            }
        })

        if(existingDiscipline) {
            throw new (0, _CustomError2.default)(`${existingDiscipline.nome} ` + _messages_pt2.default.ALREADY_IN_SYSTEM, _httpStatus2.default.BAD_REQUEST)
        }

        const discipline = await _disciplinaespecializacao2.default.create({
            nome: req.body.nome,
            descricao: req.body.descricao,
            eixoTematico: req.body.eixoTematico,
            categoria: req.body.categoria
        })	

        return res.status(_httpStatus2.default.CREATED).json(discipline)
    }

    async get(_, res) {
        const disciplines = await _disciplinaespecializacao2.default.findAll()

        return res.status(_httpStatus2.default.SUCCESS).json(disciplines)
    }
}

exports. default = new disciplinaEspecializacaoController()