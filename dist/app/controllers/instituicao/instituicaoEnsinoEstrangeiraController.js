"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { newObj[key] = obj[key]; } } } newObj.default = obj; return newObj; } } function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _yup = require('yup'); var Yup = _interopRequireWildcard(_yup);
var _instituicaoensinoestrangeira = require('../../models/instituicao/instituicaoensinoestrangeira'); var _instituicaoensinoestrangeira2 = _interopRequireDefault(_instituicaoensinoestrangeira);
var _instituicaoEnsinoController = require('./instituicaoEnsinoController'); var _instituicaoEnsinoController2 = _interopRequireDefault(_instituicaoEnsinoController);
var _messages_pt = require('../../utils/messages/messages_pt'); var _messages_pt2 = _interopRequireDefault(_messages_pt);
var _httpStatus = require('../../utils/httpStatus/httpStatus'); var _httpStatus2 = _interopRequireDefault(_httpStatus);
var _CustomError = require('../../utils/CustomError/CustomError'); var _CustomError2 = _interopRequireDefault(_CustomError);

class instituicaoEnsinoEstrangeiraController {
    async post(req, res){
        const institution = await _instituicaoEnsinoController2.default.post(req, res, 0)

        const foreignInstitution = await institution.createInstituicaoEnsinoEstrangeira({
            pais: req.body.pais,
            sigla: req.body.sigla
        })

        return res.status(_httpStatus2.default.CREATED).json(foreignInstitution)
    }

    async get(_, res) {
        const institutions = await _instituicaoensinoestrangeira2.default.findAll()

        return res.status(_httpStatus2.default.SUCCESS).json(institutions)
    }
}

exports. default = new instituicaoEnsinoEstrangeiraController()