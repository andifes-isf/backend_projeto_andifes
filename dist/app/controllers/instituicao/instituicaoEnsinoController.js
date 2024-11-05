"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { newObj[key] = obj[key]; } } } newObj.default = obj; return newObj; } } function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _yup = require('yup'); var Yup = _interopRequireWildcard(_yup);

// Models
var _instituicaoensino = require('../../models/instituicao/instituicaoensino'); var _instituicaoensino2 = _interopRequireDefault(_instituicaoensino);
var _instituicaoensinoestrangeira = require('../../models/instituicao/instituicaoensinoestrangeira'); var _instituicaoensinoestrangeira2 = _interopRequireDefault(_instituicaoensinoestrangeira);
var _instituicaoensinobrasileira = require('../../models/instituicao/instituicaoensinobrasileira'); var _instituicaoensinobrasileira2 = _interopRequireDefault(_instituicaoensinobrasileira);

// Utils
var _sequelize = require('sequelize');
var _messages_pt = require('../../utils/messages/messages_pt'); var _messages_pt2 = _interopRequireDefault(_messages_pt);
var _CustomError = require('../../utils/CustomError/CustomError'); var _CustomError2 = _interopRequireDefault(_CustomError);
var _httpStatus = require('../../utils/httpStatus/httpStatus'); var _httpStatus2 = _interopRequireDefault(_httpStatus);

class instituicaoEnsinoController {
    async post(req, res, brasileira){
        const existingInstitution = await _instituicaoensino2.default.findOne({
            where: {
                [_sequelize.Op.or]: [{nome: req.body.nome}, {documentoVinculo: req.body.documentoVinculo}]
            }
        })

        if(existingInstitution) {
            throw new (0, _CustomError2.default)(`"${existingInstitution.nome}" ou "${existingInstitution.documentoVinculo}"` + _messages_pt2.default.ALREADY_IN_SYSTEM, _httpStatus2.default.BAD_REQUEST)
        }

        let acronymRegistered

        if (brasileira == 1) {
            acronymRegistered = ( await _instituicaoensinobrasileira2.default.findOne({
                where: {
                    [_sequelize.Op.or]: [{sigla: req.body.sigla}, {CNPJ: req.body.CNPJ}]
                }
            }) ) !== null
        } else {
            acronymRegistered = ( await _instituicaoensinoestrangeira2.default.findOne({
                where: {
                    sigla: req.body.sigla
                }
            }) ) !== null
        }

        if(acronymRegistered) {
            throw new (0, _CustomError2.default)(`${req.body.sigla} ${brasileira == 1 ? `ou ${req.body.CNPJ}` : ""}` + _messages_pt2.default.EXISTING_ACRONYM, _httpStatus2.default.BAD_REQUEST)
        }


        return await _instituicaoensino2.default.create({
            nome: req.body.nome,
            documentoVinculo: req.body.documentoVinculo,
            brasileira: brasileira
        })
    }

    async get(_, res) {
        const institutions = await _instituicaoensino2.default.findAll()

        return res.status(_httpStatus2.default.SUCCESS).json(institutions)
    }
}

exports. default = new instituicaoEnsinoController()