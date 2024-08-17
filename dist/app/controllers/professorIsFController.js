"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _sequelize = require('sequelize');
var _professorisf = require('../models/professorisf'); var _professorisf2 = _interopRequireDefault(_professorisf);
var _usuario = require('../models/usuario'); var _usuario2 = _interopRequireDefault(_usuario);
var _instituicaoensino = require('../models/instituicaoensino'); var _instituicaoensino2 = _interopRequireDefault(_instituicaoensino);
var _usuarioController = require('./usuarioController'); var _usuarioController2 = _interopRequireDefault(_usuarioController);

class ProfessorIsFController {
    async post(req, res) {
        try {
            await _usuarioController2.default.post(req, res, 'professorisf')
    
            const professorExistente = await _professorisf2.default.findOne({
                where: {
                    login: req.body.login,
                    inicio: req.body.inicio
                }
            })
    
            if(professorExistente) {
                return 0
            }
            
            return await _professorisf2.default.create({
                login: req.body.login,
                poca: req.body.poca,
                inicio: req.body.inicio,
                fim: req.body.fim
            })
        } catch (error) {
            return res.status(500).json("Ocorreu um erro interno no servidor: " + error)
        }

    }

    async get(_, res){
        try {
            const professores = await _professorisf2.default.findAll({
                include: [
                    {
                        model: _usuario2.default,
                        attributes: {
                            include: [
                                [_sequelize.Sequelize.fn('CONCAT_WS', ' ', _sequelize.Sequelize.col('Usuario.nome'), _sequelize.Sequelize.col('Usuario.sobrenome')), 'nomeCompleto'],
                                [_sequelize.Sequelize.fn('CONCAT_WS', '@', _sequelize.Sequelize.col('nomeEmail'), _sequelize.Sequelize.col('dominio')), 'email']
                            ],
                            exclude: ['login', 'senha_encriptada', 'ativo', 'tipo', 'sobrenome', 'dominio', 'nomeEmail']
                        }
                    },
                    {

                        // Precisaria testar, mas acredito que se quisermos pegar todas as relações que um professor tem com alguma instituição de ensino, a gente teria que 
                        // incluir primeiro o comprovanteprofessorinstituicao e através dele incluir as instituicoesensino

                        model: _instituicaoensino2.default,
                        attributes: {
                            exclude: ['idInstituicao']
                        },
                        through: {
                            attributes: ['inicio']
                        },
                    }
                ],
                logging: console.log
            })
            
            return res.status(200).json(professores)
            
        } catch (error) {
            return res.status(500).json("Ocorreu um erro interno no servidor: " + error)
        }

    }
}

exports. default = new ProfessorIsFController()