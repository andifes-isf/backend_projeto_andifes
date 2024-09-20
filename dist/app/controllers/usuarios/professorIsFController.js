"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _sequelize = require('sequelize');
var _professorisf = require('../../models/usuarios/professorisf'); var _professorisf2 = _interopRequireDefault(_professorisf);
var _usuario = require('../../models/usuarios/usuario'); var _usuario2 = _interopRequireDefault(_usuario);
var _instituicaoensino = require('../../models/instituicao/instituicaoensino'); var _instituicaoensino2 = _interopRequireDefault(_instituicaoensino);
var _proeficienciaprofessorisf = require('../../models/proeficiencia/proeficienciaprofessorisf'); var _proeficienciaprofessorisf2 = _interopRequireDefault(_proeficienciaprofessorisf);
var _usuarioController = require('./usuarioController'); var _usuarioController2 = _interopRequireDefault(_usuarioController);

class ProfessorIsFController {
    async post(req, res, cursista) {
        try {
            await _usuarioController2.default.post(req, res, cursista ? 'cursista' : 'professorisf')
    
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
                fim: req.body.fim,
                cursista: cursista
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

    async postProeficiencia(req, res) {
        try {
            if(!(req.tipoUsuario === "professorisf" || req.tipoUsuario === "cursista")){
                return res.status(403).json({
                    error: 'Acesso negado'
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
    
            const proeficiencia = await _proeficienciaprofessorisf2.default.create({
                login: req.loginUsuario,
                nivel: req.body.nivel,
                idioma: req.body.idioma,
                comprovante: req.body.comprovante
            })
    
            return res.status(201).json(proeficiencia)   
        } catch (error) {
            return res.status(500).json("Ocorreu um erro interno no servidor: " + error)
        }
    }

    async getMinhaProeficiencia(req, res) {
        try {
            if(!(req.tipoUsuario === "professorisf" || req.tipoUsuario === "cursista")){
                return res.status(403).json({
                    error: "Acesso negado"
                })
            }

            const proeficiencias = await _proeficienciaprofessorisf2.default.findAll({
                where: {
                    login: req.loginUsuario
                }
            })

            return res.status(200).json(proeficiencias)
        } catch (error) {
            return res.status(500).json('Ocorreu um erro interno no servidor: ' + error)
        }
    }
}

exports. default = new ProfessorIsFController()