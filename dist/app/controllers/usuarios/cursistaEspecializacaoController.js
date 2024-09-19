"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _sequelize = require('sequelize');

// Models
var _cursistaespecializacao = require('../../models/usuarios/cursistaespecializacao'); var _cursistaespecializacao2 = _interopRequireDefault(_cursistaespecializacao);
var _materialcursista = require('../../models/curso_especializacao/materialcursista'); var _materialcursista2 = _interopRequireDefault(_materialcursista);
var _professorisf = require('../../models/usuarios/professorisf'); var _professorisf2 = _interopRequireDefault(_professorisf);
var _usuario = require('../../models/usuarios/usuario'); var _usuario2 = _interopRequireDefault(_usuario);

// Controllers
var _professorIsFController = require('./professorIsFController'); var _professorIsFController2 = _interopRequireDefault(_professorIsFController);

class CursistaEspecializacaoController {
    async post(req, res) {
        try {    
            await _professorIsFController2.default.post(req, res, 1)
            
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
            console.log(error)
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
                                exclude: ['login', 'senha_encriptada', 'ativo']
                            }
                        }]
                    }
                ]
            })

            return res.status(200).json(cursistas)
        } catch (error) {
            console.log(error)
            return res.status(500).json("Ocorreu um erro interno no servidor: " + error)
        }

    }

    async postMaterial(req, res){
        try {
            if(!(req.tipoUsuario === 'cursista')){
                return res.status(403).json({
                    error: 'Acesso negado'
                })
            }

            // Verifica se o material já existe
            const materialExistente = await _materialcursista2.default.findOne({
                where: {
                    nome: req.body.nome,
                    login: req.loginUsuario
                }
            })

            if(materialExistente){
                return res.status(409).json({
                    msg: "Material ja existente"
                })
            }

            const material = await _materialcursista2.default.create({
                login: req.loginUsuario,
                idioma: req.body.idioma,
                nome: req.body.nome,
                nivel: req.body.nivel,
                ementa: req.body.ementa,
                cargaHoraria: req.body.cargaHoraria,
            })

            return res.status(201).json(material)

        } catch (error) {
            return res.status(500).json("Ocorreu um erro interno no servidor: " + error)
        }

    }

    async getMeusMateriais(req, res){
        try {
            if(!(req.tipoUsuario === 'cursista')){
                return res.status(403).json({
                    error: 'Acesso negado'
                })
            }            

            const materiais = await _materialcursista2.default.findAll({
                where: {
                    login: req.loginUsuario
                }
            })

            return res.status(200).json(materiais)
        } catch (error) {
            return res.status(500).json("Ocorreu um erro interno no servidor: " + error)
        }
    }
}

exports. default = new CursistaEspecializacaoController()