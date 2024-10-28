import * as Yup from 'yup'
import DisciplinaEspecializacao from '../../models/curso_especializacao/disciplinaespecializacao'
import MESSAGES from '../../utils/messages/messages_pt'

class disciplinaEspecializacaoController {
    async post(req, res){
        try {
            const disciplinaExistente = await DisciplinaEspecializacao.findOne({
                where: {
                    nome: req.body.nome
                }
            })
    
            if(disciplinaExistente) {
                return res.status(409).json({
                    msg: `${disciplinaExistente.nome} ` + MESSAGES.ALREADY_IN_SYSTEM
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
            return res.status(500).json(MESSAGES.INTERNAL_SERVER_ERROR + error)
        }
    }

    async get(_, res) {
        try {
            const disciplinas = await DisciplinaEspecializacao.findAll()

            return res.status(200).json(disciplinas)
        } catch (error) {
            return res.status(500).json(MESSAGES.INTERNAL_SERVER_ERROR + error)
        }
    }
}

export default new disciplinaEspecializacaoController()