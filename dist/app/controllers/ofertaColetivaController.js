"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _ofertacoletiva = require('../models/ofertacoletiva'); var _ofertacoletiva2 = _interopRequireDefault(_ofertacoletiva);

class ofertaColetivaController {
    async post(req, res) {
        try {
            const ofertaExistente = await _ofertacoletiva2.default.findOne({
                where: {
                    ano: req.body.ano,
                    edicao: req.body.edicao
                }
            })

            if(ofertaExistente) {
                return res.status(409).json({
                    msg: "Oferta Coletiva ja cadastrada"
                })
            }

            console.log(req.body.ano)
            console.log(req.body.edicao)

            const oferta = await _ofertacoletiva2.default.create({
                ano: req.body.ano,
                edicao: req.body.edicao
            })

            return res.status(201).json(oferta)
        } catch (error) {
            return res.status(500).json("Ocorreu um erro interno no servidor: " + error)
        }
    }

    async get(_, res) {
        try {
            const ofertas = await _ofertacoletiva2.default.findAll()

            return res.status(200).json(ofertas)
        } catch (error) {
            return res.status(500).json("Ocorreu um erro interno no servidor: " + error)
        }
    }
}

exports. default = new ofertaColetivaController()