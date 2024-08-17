"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _sequelize = require('sequelize');
var _cursistaespecializacao = require('../models/cursistaespecializacao'); var _cursistaespecializacao2 = _interopRequireDefault(_cursistaespecializacao);
var _usuario = require('../models/usuario'); var _usuario2 = _interopRequireDefault(_usuario);
var _professorisf = require('../models/professorisf'); var _professorisf2 = _interopRequireDefault(_professorisf);
var _professorIsFController = require('../controllers/professorIsFController'); var _professorIsFController2 = _interopRequireDefault(_professorIsFController);

class CursistaEspecializacaoController {
    async post(req, res) {
        try {    
            await _professorIsFController2.default.post(req, res)
            
            const cursistaExistente = await _cursistaespecializacao2.default.findOne({
                where: {
                    login: req.body.login
                }
            })
    
            if(cursistaExistente) {
                return res.status(409).json({
                    msg: "Cursista de especializacao ja cadastrado"
                })
            }
            
            const cursista = await _cursistaespecializacao2.default.create({
                login: req.body.login
            })
    
            return res.status(201).json(cursista)
        } catch (error) {
            return res.status(500).json("Ocorreu um erro interno no servidor: " + error)
        }

    }

    async get(_, res){
        try {
            const cursistas = await _cursistaespecializacao2.default.findAll({
                include: [
                    {
                        model: _professorisf2.default,
                        attributes: {
                            exclude: ['login'],
                        },
                        include: [{
                            model: _usuario2.default,
                            attributes: {
                                exclude: ['login', 'senha_encriptada', 'ativo', 'tipo']
                            }
                        }]
                    }
                ],
                logging: console.log
            })
            
            return res.status(200).json(cursistas)
            
        } catch (error) {
            console.log(error)
            return res.status(500).json("Ocorreu um erro interno no servidor: " + error)
        }

    }
}

exports. default = new CursistaEspecializacaoController()