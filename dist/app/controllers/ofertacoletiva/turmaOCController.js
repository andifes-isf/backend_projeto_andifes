"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _turmaoc = require('../../models/ofertacoletiva/turmaoc'); var _turmaoc2 = _interopRequireDefault(_turmaoc);
var _curso = require('../../models/ofertacoletiva/curso'); var _curso2 = _interopRequireDefault(_curso);
var _professorisf = require('../../models/usuarios/professorisf'); var _professorisf2 = _interopRequireDefault(_professorisf);

class turmaOCController {
    async post(req, res) {        
        try {
            // Verificação de acesso (verificar quem mais pode criar uma turma)
            if(!(req.tipoUsuario === 'professorisf')){
                return res.status(403).json({
                    error: 'Acesso negado'
                })
            }
    
            const turmaExistente = await _turmaoc2.default.findOne({
                where: {
                    nome: req.body.nome
                }
            })
    
            if(turmaExistente) {
                return res.status(409).json({
                    msg: "Turma da Oferta Coletiva ja cadastrada"
                })
            }

            const turma = await _turmaoc2.default.create({
                idCurso: req.body.idCurso,
                nVagas: req.body.nVagas,
                nome: req.body.nome,
                nInscritos: req.body.nInscritos,
                nConcluintes: req.body.nConcluintes,
                nReprovados: req.body.nReprovados,
            })

            return res.status(201).json(turma)
        } catch (error) {
            return res.status(500).json("Ocorreu um erro interno no servidor: " + error)
        }

    }

    async get(_, res) {
        try {
            const turmas = await _turmaoc2.default.findAll({
                include: [
                    {
                        model: _curso2.default,
                        attributes: ['nome', 'idioma', 'categoria', 'nivel', 'cargaHoraria']
                    },
                    {
                        model: _professorisf2.default,
                        attributes: {
                            exclude: ['poca']
                        },
                        through: {
                            attributes: {
                                exclude: ['login', 'idTurma'],
                                include: ['inicio', 'termino']
                            }
                        }
                    }
                ],
                order: [
                    ['idCurso', 'ASC'],
                    ['idTurma', 'ASC']
                ]
            })

            return res.status(200).json(turmas)
        } catch (error) {
            return res.status(500).json("Ocorreu um erro interno no servidor: " + error)
        }
    }

}

exports. default = new turmaOCController()