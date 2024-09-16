import * as Yup from 'yup'
import TurmaDisciplinaEspecializacao from '../../models/curso_especializacao/turmadisciplinaespecializacao'

class turmaDisciplinaEspecializacaoController {
    async post(req, res){
        try {
            const turmaExistente = await TurmaDisciplinaEspecializacao.findOne({
                where: {
                    nome: req.body.nome,
                }
            })
    
            if(turmaExistente) {
                return res.status(409).json({
                    msg: "Turma ja cadastrada no sistema"
                })
            }

            const turma = await TurmaDisciplinaEspecializacao.create({
                disciplina: req.body.disciplina,
                nome: req.body.nome,
                mesOferta: req.body.mesOferta,
                numeroVagas: req.body.numeroVagas,
                numeroMinimoAlunos: req.body.numeroMinimoAlunos,
                numeroInscritos: req.body.numeroInscritos,
                numeroAprovados: req.body.numeroAprovados,
                numeroDesistentes: req.body.numeroDesistentes,
                numeroReprovados: req.body.numeroReprovados,
            })	
    
            return res.status(201).json(turma)
        } catch (error) {
            return res.status(500).json("Ocorreu um erro interno no servidor: " + error)
        }
    }

    async get(_, res) {
        try {
            const turmas = await TurmaDisciplinaEspecializacao.findAll()

            return res.status(200).json(turmas)
        } catch (error) {
            return res.status(500).json("Ocorreu um erro interno no servidor: " + error)
        }
    }

    async updateData(req, res){
        try {
            // Buscando registro no banco de dados
            const turma = await TurmaDisciplinaEspecializacao.findOne({
                where: {
                    nome: req.params.nome
                }
            })

            if(!turma){
                return res.status(404).json({
                    error: "Turma nao encontrada"
                })
            }

            // Atualizando o registro
            const numeroVagas = req.body.numeroVagas
            const numeroMinimoAlunos = req.body.numeroMinimoAlunos
            
            turma.numeroVagas = numeroVagas === undefined ? turma.numeroVagas : numeroVagas
            turma.numeroMinimoAlunos = numeroMinimoAlunos === undefined ? turma.numeroMinimoAlunos : numeroMinimoAlunos

            await turma.save()

            return res.status(201).json(turma)
        } catch (error) {
            console.log(error)
        }
    }
}

export default new turmaDisciplinaEspecializacaoController()