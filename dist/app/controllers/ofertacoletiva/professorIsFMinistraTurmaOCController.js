"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }// Models
var _professorisfministraturmaoc = require('../../models/ofertacoletiva/professorisfministraturmaoc'); var _professorisfministraturmaoc2 = _interopRequireDefault(_professorisfministraturmaoc);
var _proeficienciaprofessorisf = require('../../models/proeficiencia/proeficienciaprofessorisf'); var _proeficienciaprofessorisf2 = _interopRequireDefault(_proeficienciaprofessorisf);
var _turmaoc = require('../../models/ofertacoletiva/turmaoc'); var _turmaoc2 = _interopRequireDefault(_turmaoc);
var _curso = require('../../models/ofertacoletiva/curso'); var _curso2 = _interopRequireDefault(_curso);

// Classe auxiliar
var _nivelFactory = require('../../utils/factories/nivelFactory'); var _nivelFactory2 = _interopRequireDefault(_nivelFactory);

class ProfessorIsFMinistraTurmaOCController {
    async post(req, res) {
        try {
            if(!(req.tipoUsuario === 'professorisf')){
                return res.status(403).json({
                    error: 'Acesso negado'
                })
            }
            
            // Verifica se o professor já está ministrando a turma
            const professorNaTurma = await _professorisfministraturmaoc2.default.findOne({
                where: {
                    login: req.loginUsuario,
                    idTurma: req.body.idTurma
                }
            })

            if(professorNaTurma){
                return res.status(409).json({
                    msg: "Professor ja ministrando a turma"
                })
            }

            // Precisa verificar se um Docente Orientador pode associar um orientando a uma turma
            const turma = await _turmaoc2.default.findOne({
                where: {
                    idTurma: req.body.idTurma
                }
            })

            if(!turma){
                return res.status(422).json({
                    msg: "Turma nao encontrada"
                })
            }

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
    
            const nivelProeficiencia = _nivelFactory2.default.createInstanceOfNivel(curso.idioma)
            const diferencaEntreNivel = nivelProeficiencia.distanciaEntreNiveis(proeficienciaProfessor ? proeficienciaProfessor.nivel : 'nenhum', curso.nivel)
            console.log(proeficienciaProfessor)
            // console.log(proeficienciaProfessor.nivel)
            console.log(curso.nivel)
            console.log(diferencaEntreNivel)
            if(diferencaEntreNivel < 0) {
                return res.status(422).json({
                    msg: `${req.loginUsuario} possui proeficiencia abaixo da proeficiencia do curso (${curso.nivel})`
                })
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