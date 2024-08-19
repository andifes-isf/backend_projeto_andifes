// Models
import ProfessorIsFMinistraTurmaOC from "../models/professorisfministraturmaoc"
import ProeficienciaProfessorIsf from '../models/proeficienciaprofessorisf'
import TurmaOC from '../models/turmaoc'
import Curso from '../models/curso'

// Classe auxiliar
import nivelFactory from '../utils/factories/nivelFactory'

class ProfessorIsFMinistraTurmaOCController {
    async post(req, res) {
        try {
            
            // Precisa verificar se um Docente Orientador pode associar um orientando a uma turma
    
            if(!(req.tipoUsuario === 'professorisf')){
                return res.status(403).json({
                    error: 'Acesso negado'
                })
            }
    
            const turma = await TurmaOC.findOne({
                where: {
                    idTurma: req.body.idTurma
                }
            })
            console.log(turma)

            const curso = await Curso.findOne({
                where: {
                    idCurso: turma.idCurso
                }
            })
            
            const proeficienciaProfessor = await ProeficienciaProfessorIsf.findOne({
                where: {
                    login: req.loginUsuario,
                    idioma: curso.idioma
                }
            })
    
            const nivelProeficiencia = nivelFactory.createInstanceOfNivel(curso.idioma)
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


            const relacaoExistente = await ProfessorIsFMinistraTurmaOC.findOne({
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
                    
            const relacao = await ProfessorIsFMinistraTurmaOC.create({
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
            const relacoes = await ProfessorIsFMinistraTurmaOC.findAll()

            return res.status(200).json(relacoes)
        } catch (error) {
            return res.status(500).json("Ocorreu um erro interno no servidor: " + error)
        }
    }
}

export default new ProfessorIsFMinistraTurmaOCController()