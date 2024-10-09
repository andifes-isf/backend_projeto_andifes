import * as Yup from 'yup'
import TurmaDisciplinaEspecializacao from '../../models/curso_especializacao/turmadisciplinaespecializacao'
import AlteracaoTurmaEspecializacao from '../../models/curso_especializacao/alteracaoturmaespecializacao'
import MinistranteMinistraTurmaEspecializacao from '../../models/curso_especializacao/ministranteMinistraTurmaEspecializacao'

class turmaDisciplinaEspecializacaoController {
    
    async post(req, res){
        try {

            const nomeTurma = req.body.edital + "_" + req.body.disciplina + "_" + req.body.mesOferta

            const turmaExistente = await TurmaDisciplinaEspecializacao.findOne({
                where: {
                    nome: nomeTurma,
                }
            })
            
            if(turmaExistente) {
                return res.status(409).json({
                    msg: "Turma ja cadastrada no sistema"
                })
            }
            
            const turma = await TurmaDisciplinaEspecializacao.create({
                disciplina: req.body.disciplina,
                edital: req.body.edital,
                nome: req.body.nome,
                mesOferta: req.body.mesOferta,
                numeroVagas: req.body.numeroVagas,
                numeroMinimoAlunos: req.body.numeroMinimoAlunos,
                numeroInscritos: req.body.numeroInscritos,
                numeroAprovados: req.body.numeroAprovados,
                numeroDesistentes: req.body.numeroDesistentes,
                numeroReprovados: req.body.numeroReprovados,
            })	

            const relacaoComTurma = await MinistranteMinistraTurmaEspecializacao.create({
                nomeTurma: turma.nome,
                login: req.body.loginMinistrante
            })
            
            return res.status(201).json({
                turma: turma,
                relacao: relacaoComTurma
            })
        } catch (error) {
            return res.status(500).json("Ocorreu um erro interno no servidor: " + error)
        }
    }
    
    async get(_, res) {
        try {
            const turmas = await TurmaDisciplinaEspecializacao.findAll({
                order: [
                    ['edital', 'DESC']
                ]
            })
            
            return res.status(200).json(turmas)
        } catch (error) {
            return res.status(500).json("Ocorreu um erro interno no servidor: " + error)
        }
    }

    async getPorAno(req, res) {
        try {
            const turmas = await TurmaDisciplinaEspecializacao.findAll({
                where: {
                    edital: req.params.ano
                },
                order: [
                    ['nome', 'ASC']
                ]
            })
            
            return res.status(200).json(turmas)
        } catch (error) {
            return res.status(500).json("Ocorreu um erro interno no servidor: " + error)
        }
    }
}

export default new turmaDisciplinaEspecializacaoController()