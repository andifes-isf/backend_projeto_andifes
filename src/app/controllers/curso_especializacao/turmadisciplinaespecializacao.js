import * as Yup from 'yup'
import TurmaDisciplinaEspecializacao from '../../models/curso_especializacao/turmadisciplinaespecializacao'

class turmaDisciplinaEspecializacaoController {
    async post(req, res){
        try {
            const disciplinaExistente = await TurmaDisciplinaEspecializacao.findOne({
                where: {
                    nome: req.body.nome,
                    idTurma: req.body.idTurma
                }
            })
			console.log("TESTE")
    
            if(disciplinaExistente) {
                return res.status(409).json({
                    msg: "Disciplina ja cadastrada no sistema"
                })
            }

            const disciplina = await TurmaDisciplinaEspecializacao.create({
                nome: req.body.nome,
                descricao: req.body.descricao,
                eixoTematico: req.body.eixoTematico,
                categoria: req.body.categoria
            })	
    
            return res.status(201).json(disciplina)
        } catch (error) {
            return res.status(500).json("Ocorreu um erro interno no servidor: " + error)
        }
    }

    async get(_, res) {
        try {
            const disciplinas = await TurmaDisciplinaEspecializacao.findAll()

            return res.status(200).json(disciplinas)
        } catch (error) {
            return res.status(500).json("Ocorreu um erro interno no servidor: " + error)
        }
    }

    async getPerMonth(_, res, categoria) {
        try {
            const disciplinas = await TurmaDisciplinaEspecializacao.findAll({
                where: {
                    categoria: categoria
                }
            })

            return res.status(200).json(disciplinas)
        } catch (error) {
            return res.status(500).json("Ocorreu um erro interno no servidor: " + error)
        }
    }
}

export default new turmaDisciplinaEspecializacaoController()