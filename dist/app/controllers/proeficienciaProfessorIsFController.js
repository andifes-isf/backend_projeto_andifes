"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { newObj[key] = obj[key]; } } } newObj.default = obj; return newObj; } } function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _yup = require('yup'); var Yup = _interopRequireWildcard(_yup);
var _proeficienciaprofessorisf = require('../models/proeficienciaprofessorisf'); var _proeficienciaprofessorisf2 = _interopRequireDefault(_proeficienciaprofessorisf);

class ProeficienciaProfessorIsFController {
    async post(req, res) {

        if(!(req.tipoUsuario === 'professorisf')){
            return res.status(404).json({
                error: 'Pagina nao encontrada'
            })
        }

        const proeficiaenciaExistente = await _proeficienciaprofessorisf2.default.findOne({
            where: {
                login: req.loginUsuario,
                idioma: req.body.idioma,
                nivel: req.body.nivel
            }
        })

        if(proeficiaenciaExistente) {
            return res.status(422).json({
                msg: "Proeficiencia do professor ja cadastrada"
            })
        }

        try {
            const proeficiaencia = await _proeficienciaprofessorisf2.default.create({
                login: req.loginUsuario,
                nivel: req.body.nivel,
                idioma: req.body.idioma,
                comprovante: req.body.comprovante
            })
    
            return res.status(201).json(proeficiaencia)    
        } catch (error) {
            return res.status(422).json(error.message)
        }

    }
}

exports. default = new ProeficienciaProfessorIsFController()