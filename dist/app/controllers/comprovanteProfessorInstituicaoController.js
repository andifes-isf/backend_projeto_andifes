"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { newObj[key] = obj[key]; } } } newObj.default = obj; return newObj; } } function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _yup = require('yup'); var Yup = _interopRequireWildcard(_yup);
var _comprovanteprofessorinstituicao = require('../models/comprovanteprofessorinstituicao'); var _comprovanteprofessorinstituicao2 = _interopRequireDefault(_comprovanteprofessorinstituicao);

class ComprovanteProfessorInstituicaoController {
    async post(req, res) {
        if(!(req.tipoUsuario === 'professorisf')){
            console.log(req.tipoUsuario)
            return res.status(404).json({
                error: 'Pagina nao encontrada'
            })
        }

        const comprovanteExistente = await _comprovanteprofessorinstituicao2.default.findOne({
            where: {
                login: req.loginUsuario,
                idInstituicao: req.body.idInstituicao,
                inicio: req.body.inicio
            }
        })

        if(comprovanteExistente) {
            return res.status(422).json({
                msg: "Comprovante de Professor ja cadastrado"
            })
        }

        try {
            const comprovante = await _comprovanteprofessorinstituicao2.default.create({
                idInstituicao: req.body.idInstituicao,
                login: req.loginUsuario,
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

exports. default = new ComprovanteProfessorInstituicaoController()