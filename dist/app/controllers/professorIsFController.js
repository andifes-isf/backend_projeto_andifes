"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _sequelize = require('sequelize');
var _professorisf = require('../models/professorisf'); var _professorisf2 = _interopRequireDefault(_professorisf);
var _usuario = require('../models/usuario'); var _usuario2 = _interopRequireDefault(_usuario);
var _usuarioController = require('./usuarioController'); var _usuarioController2 = _interopRequireDefault(_usuarioController);

class ProfessorIsFController {
    async post(req, res) {
        await _usuarioController2.default.post(req, res, 'professorisf')

        const professorExistente = await _professorisf2.default.findOne({
            where: {
                login: req.body.login,
                inicio: req.body.inicio
            }
        })

        if(professorExistente) {
            return res.status(422).json({
                msg: "Professor IsF ja cadastrado"
            })
        }

        const professor = await _professorisf2.default.create({
            login: req.body.login,
            poca: req.body.poca,
            inicio: req.body.inicio,
            fim: req.body.fim
        })

        return res.status(201).json(professor)
    }

    async get(_, res){
        try {
            const professores = await _professorisf2.default.findAll({
                include: [
                    {
                        model: _usuario2.default,
                        attributes: {
                            include: [
                                [_sequelize.Sequelize.fn('CONCAT_WS', ' ', _sequelize.Sequelize.col('nome'), _sequelize.Sequelize.col('sobrenome')), 'nome'],
                                [_sequelize.Sequelize.fn('CONCAT_WS', '@', _sequelize.Sequelize.col('nomeEmail'), _sequelize.Sequelize.col('dominio')), 'email']
                            ],
                            exclude: ['login', 'senha_encriptada', 'ativo', 'tipo', 'sobrenome', 'dominio', 'nomeEmail']
                        }
                    }
                ]
            })
            
            return res.status(200).json(professores)
            
        } catch (error) {
            return res.status(400).json(error)
        }

    }
}

exports. default = new ProfessorIsFController()