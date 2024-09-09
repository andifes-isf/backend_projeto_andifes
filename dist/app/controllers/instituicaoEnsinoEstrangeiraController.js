"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { newObj[key] = obj[key]; } } } newObj.default = obj; return newObj; } } function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _yup = require('yup'); var Yup = _interopRequireWildcard(_yup);
var _instituicaoensinoestrangeira = require('../models/instituicao/instituicaoensinoestrangeira'); var _instituicaoensinoestrangeira2 = _interopRequireDefault(_instituicaoensinoestrangeira);
var _instituicaoEnsinoController = require('./instituicaoEnsinoController'); var _instituicaoEnsinoController2 = _interopRequireDefault(_instituicaoEnsinoController);

class instituicaoEnsinoEstrangeiraController {
    async post(req, res){
        try {
            await _instituicaoEnsinoController2.default.post(req, res, 0)

            const instituicaoExistente = await _instituicaoensinoestrangeira2.default.findOne({
                where: {
                    pais: req.body.pais,
                    sigla: req.body.sigla
                }
            })
    
            if(instituicaoExistente) {
                return res.status(409).json({
                    msg: "Instituicao de Ensino Estrangeira ja cadastrada"
                })
            }
    
            const instituicao = await _instituicaoensinoestrangeira2.default.create({
                pais: req.body.pais,
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
            const instituicoes = await _instituicaoensinoestrangeira2.default.findAll()

            return res.status(200).json(instituicoes)
        } catch (error) {
            return res.status(500).json("Ocorreu um erro interno no servidor: " + error)
        }
    }
}

exports. default = new instituicaoEnsinoEstrangeiraController()