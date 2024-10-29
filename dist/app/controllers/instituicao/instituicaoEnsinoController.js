"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { newObj[key] = obj[key]; } } } newObj.default = obj; return newObj; } } function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _yup = require('yup'); var Yup = _interopRequireWildcard(_yup);
var _instituicaoensino = require('../../models/instituicao/instituicaoensino'); var _instituicaoensino2 = _interopRequireDefault(_instituicaoensino);
var _messages_pt = require('../../utils/messages/messages_pt'); var _messages_pt2 = _interopRequireDefault(_messages_pt);

class instituicaoEnsinoController {
    async post(req, res, brasileira){
        try {
            const existingInstitution = await _instituicaoensino2.default.findOne({
                where: {
                    nome: req.body.nome
                }
            })
    
            if(existingInstitution) {
                return 0
            }
    
            return await _instituicaoensino2.default.create({
                nome: req.body.nome,
                documentoVinculo: req.body.documentoVinculo,
                brasileira: brasileira
            })
        } catch (error) {
            return res.status(500).json(_messages_pt2.default.INTERNAL_SERVER_ERROR + error)
        }
    }

    async get(_, res) {
        try {
            const institutions = await _instituicaoensino2.default.findAll()

            return res.status(200).json(institutions)
        } catch (error) {
            return res.status(500).json("Ocorreu um erro interno no servidor: " + error)
        }
    }
}

exports. default = new instituicaoEnsinoController()