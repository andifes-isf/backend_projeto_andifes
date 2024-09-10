import * as Yup from 'yup'
import DisciplinaEspecializacao from '../../models/curso_especializacao/disciplinaespecializacao'

class disciplinaEspecializacaoController {
    async post(req, res){
        try {
            const disciplinaExistente = await DisciplinaEspecializacao.findOne({
                where: {
                    nome: req.body.nome
                }
            })
			console.log("TESTE")
    
            if(disciplinaExistente) {
                return res.status(409).json({
                    msg: "Disciplina ja cadastrada no sistema"
                })
            }

            const disciplina = await DisciplinaEspecializacao.create({
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
            const disciplinas = await DisciplinaEspecializacao.findAll()

            return res.status(200).json(disciplinas)
        } catch (error) {
            return res.status(500).json("Ocorreu um erro interno no servidor: " + error)
        }
    }

    async getFiltro(_, res, categoria) {
        try {
            const disciplinas = await DisciplinaEspecializacao.findAll({
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

export default new disciplinaEspecializacaoController()