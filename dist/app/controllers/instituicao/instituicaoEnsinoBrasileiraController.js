"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { newObj[key] = obj[key]; } } } newObj.default = obj; return newObj; } } function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _yup = require('yup'); var Yup = _interopRequireWildcard(_yup);

// Models
var _instituicaoensinobrasileira = require('../../models/instituicao/instituicaoensinobrasileira'); var _instituicaoensinobrasileira2 = _interopRequireDefault(_instituicaoensinobrasileira);
var _instituicaoEnsinoController = require('./instituicaoEnsinoController'); var _instituicaoEnsinoController2 = _interopRequireDefault(_instituicaoEnsinoController);

// Utils
var _messages_pt = require('../../utils/messages/messages_pt'); var _messages_pt2 = _interopRequireDefault(_messages_pt);
var _CustomError = require('../../utils/CustomError/CustomError'); var _CustomError2 = _interopRequireDefault(_CustomError);
var _httpStatus = require('../../utils/httpStatus/httpStatus'); var _httpStatus2 = _interopRequireDefault(_httpStatus);

class instituicaoEnsinoBrasileiraController {
    async post(req, res){
        const institution = await _instituicaoEnsinoController2.default.post(req, res, 1)

        const brazilianInstitution = await institution.createInstituicaoEnsinoBrasileira({
            CNPJ: req.body.CNPJ,
            sigla: req.body.sigla
        })

        return res.status(_httpStatus2.default.CREATED).json(brazilianInstitution)
    }

    async get(_, res) {
        const institutions = await _instituicaoensinobrasileira2.default.findAll()

        return res.status(_httpStatus2.default.SUCCESS).json(institutions)
    }
}

exports. default = new instituicaoEnsinoBrasileiraController()