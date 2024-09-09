"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _sequelize = require('sequelize');
var _alunograduacao = require('../models/usuarios/alunograduacao'); var _alunograduacao2 = _interopRequireDefault(_alunograduacao);
var _usuario = require('../models/usuarios/usuario'); var _usuario2 = _interopRequireDefault(_usuario);
var _professorisf = require('../models/usuarios/professorisf'); var _professorisf2 = _interopRequireDefault(_professorisf);
var _professorIsFController = require('./professorIsFController'); var _professorIsFController2 = _interopRequireDefault(_professorIsFController);

class AlunoGraduacaoController {
    async post(req, res) {
        try {    
            await _professorIsFController2.default.post(req, res, 0)
            
            const alunoGraduacaoExistente = await _alunograduacao2.default.findOne({
                where: {
                    login: req.body.login
                }
            })
    
            if(alunoGraduacaoExistente) {
                return res.status(409).json({
                    msg: "Cursista de especializacao ja cadastrado"
                })
            }
            
            const cursista = await _alunograduacao2.default.create({
                login: req.body.login
            })
    
            return res.status(201).json(cursista)
        } catch (error) {
            return res.status(500).json("Ocorreu um erro interno no servidor: " + error)
        }

    }

    async get(_, res){
        try {
            const alunos = await _alunograduacao2.default.findAll({
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
            
            return res.status(200).json(alunos)
            
        } catch (error) {
            console.log(error)
            return res.status(500).json("Ocorreu um erro interno no servidor: " + error)
        }

    }
}

exports. default = new AlunoGraduacaoController()