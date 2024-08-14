"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _professorisfministraturmaoc = require('../models/professorisfministraturmaoc'); var _professorisfministraturmaoc2 = _interopRequireDefault(_professorisfministraturmaoc);
var _proeficienciaprofessorisf = require('../models/proeficienciaprofessorisf'); var _proeficienciaprofessorisf2 = _interopRequireDefault(_proeficienciaprofessorisf);
var _turmaoc = require('../models/turmaoc'); var _turmaoc2 = _interopRequireDefault(_turmaoc);
var _curso = require('../models/curso'); var _curso2 = _interopRequireDefault(_curso);

class ProfessorIsFMinistraTurmaOCController {
    async post(req, res) {
        try {
            
            // Precisa verificar se um Docente Orientador pode associar um orientando a uma turma
    
            if(!(req.tipoUsuario === 'professorisf')){
                return res.status(403).json({
                    error: 'Acesso negado'
                })
            }
    
            const turma = await _turmaoc2.default.findOne({
                where: {
                    idTurma: req.body.idTurma
                }
            })
    
            const curso = await _curso2.default.findOne({
                where: {
                    idCurso: turma.idCurso
                }
            })
            
            const proeficienciaProfessor = await _proeficienciaprofessorisf2.default.findOne({
                where: {
                    login: req.loginUsuario,
                    idioma: curso.idioma
                }
            })
    
            if(curso.idioma === 'japones') {
                if(proeficienciaProfessor == null) {
                    return res.status(422).json({
                        msg: `É preciso validar sua proeficiência no idioma para poder ministrar uma turma`
                    })
                }
                if(curso.nivel < proeficienciaProfessor.nivel){
                    return res.status(422).json({
                        msg: `${req.loginUsuario} possui proeficiencia ${proeficienciaProfessor.nivel} que é abaixo da proeficiencia do curso (${curso.nivel})`
                    })
                }
            } else {
                if(proeficienciaProfessor == null) {
                    return res.status(422).json({
                        msg: `É preciso validar sua proeficiência no idioma para poder ministrar uma turma`
                    })
                }
                if(curso.nivel > proeficienciaProfessor.nivel){
                    return res.status(422).json({
                        msg: `${req.loginUsuario} possui proeficiencia ${proeficienciaProfessor.nivel} que é abaixo da proeficiencia do curso (${curso.nivel})`
                    })
                }
            }

            const relacaoExistente = await _professorisfministraturmaoc2.default.findOne({
                where: {
                    login: req.loginUsuario,
                    idTurma: req.body.idTurma,
                    inicio: req.body.inicio
                }
            })
    
            if(relacaoExistente) {
                return res.status(409).json({
                    msg: "Relacao ProfessorIsF e TurmaOC ja cadastrada"
                })
            }
                    
            const relacao = await _professorisfministraturmaoc2.default.create({
                login: req.loginUsuario,
                idTurma: req.body.idTurma,
                inicio: req.body.inicio,
                termino: req.body.termino,
            })
            
            return res.status(201).json(relacao)
        } catch (error) {
            return res.status(500).json("Ocorreu um erro interno no servidor: " + error)
        }

    }

    async get(_, res) {
        try {
            const relacoes = await _professorisfministraturmaoc2.default.findAll()

            return res.status(200).json(relacoes)
        } catch (error) {
            return res.status(500).json("Ocorreu um erro interno no servidor: " + error)
        }
    }
}

exports. default = new ProfessorIsFMinistraTurmaOCController()