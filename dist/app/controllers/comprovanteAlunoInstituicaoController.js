"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { newObj[key] = obj[key]; } } } newObj.default = obj; return newObj; } } function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _yup = require('yup'); var Yup = _interopRequireWildcard(_yup);
var _comprovantealunoinstituicao = require('../models/comprovantealunoinstituicao'); var _comprovantealunoinstituicao2 = _interopRequireDefault(_comprovantealunoinstituicao);

class ComprovanteAlunoInstituicaoController {
    async post(req, res) {
        const comprovanteExistente = await _comprovantealunoinstituicao2.default.findOne({
            where: {
                login: req.body.login,
                idInstituicao: req.body.idInstituicao,
                inicio: req.body.inicio
            }
        })

        if(comprovanteExistente) {
            return res.status(422).json({
                msg: "Comprovante de Aluno ja cadastrado"
            })
        }

        try {
            const comprovante = await _comprovantealunoinstituicao2.default.create({
                idInstituicao: req.body.idInstituicao,
                login: req.body.login,
                inicio: req.body.inicio,
                termino: req.body.termino || null,
                comprovante: req.body.comprovante
            })
    
            return res.status(201).json(comprovante)    
        } catch (error) {
            return res.status(422).json(error.message)
        }

    }
}

exports. default = new ComprovanteAlunoInstituicaoController()