"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { newObj[key] = obj[key]; } } } newObj.default = obj; return newObj; } } function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _yup = require('yup'); var Yup = _interopRequireWildcard(_yup);
var _instituicaoensinobrasileira = require('../models/instituicao/instituicaoensinobrasileira'); var _instituicaoensinobrasileira2 = _interopRequireDefault(_instituicaoensinobrasileira);
var _instituicaoEnsinoController = require('./instituicaoEnsinoController'); var _instituicaoEnsinoController2 = _interopRequireDefault(_instituicaoEnsinoController);

class instituicaoEnsinoBrasileiraController {
    async post(req, res){
        try {
            await _instituicaoEnsinoController2.default.post(req, res, 1)

            const instituicaoExistente = await _instituicaoensinobrasileira2.default.findOne({
                where: {
                    CNPJ: req.body.CNPJ
                }
            })
    
            if(instituicaoExistente) {
                return res.status(409).json({
                    msg: "Instituicao de Ensino Brasileira ja cadastrada"
                })
            }
    
            const instituicao = await _instituicaoensinobrasileira2.default.create({
                CNPJ: req.body.CNPJ,
                idInstituicao: req.body.idInstituicao,
                sigla: req.body.sigla
            })
    
            return res.status(201).json(instituicao)
        } catch (error) {
            return res.status(500).json("Ocorreu um erro interno no servidor: " + error)
        }
    }

    async get(_, res) {
        try {
            const instituicoes = await _instituicaoensinobrasileira2.default.findAll()

            return res.status(200).json(instituicoes)
        } catch (error) {
            return res.status(500).json("Ocorreu um erro interno no servidor: " + error)
        }
    }
}

exports. default = new instituicaoEnsinoBrasileiraController()