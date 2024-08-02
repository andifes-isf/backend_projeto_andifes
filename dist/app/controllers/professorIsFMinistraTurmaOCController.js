"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _professorisfministraturmaoc = require('../models/professorisfministraturmaoc'); var _professorisfministraturmaoc2 = _interopRequireDefault(_professorisfministraturmaoc);

class ProfessorIsFMinistraTurmaOCController {
    async post(req, res) {
        const relacaoExistente = await _professorisfministraturmaoc2.default.findOne({
            where: {
                login: req.body.login,
                idTurma: req.body.idTurma,
                inicio: req.body.inicio
            }
        })

        if(relacaoExistente) {
            return res.status(422).json({
                msg: "Relacao ProfessorIsF e TurmaOC ja cadastrada"
            })
        }

        try {
            const relacao = await _professorisfministraturmaoc2.default.create({
                login: req.body.login,
                idTurma: req.body.idTurma,
                inicio: req.body.inicio,
                termino: req.body.termino,
            })
            
            return res.status(201).json(relacao)
        } catch (error) {
            return res.status(400).json(error)
        }

    }

    async get(_, res) {
        try {
            const relacoes = await _professorisfministraturmaoc2.default.findAll()

            return res.status(200).json(relacoes)
        } catch (error) {
            return res.status(400).json(error)
        }
    }
}

exports. default = new ProfessorIsFMinistraTurmaOCController()