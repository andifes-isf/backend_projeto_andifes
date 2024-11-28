import * as Yup from 'yup'

// Models
import DisciplinaEspecializacao from '../../models/curso_especializacao/disciplinaespecializacao'

// Utils
import MESSAGES from '../../utils/response/messages/messages_pt'
import CustomError from '../../utils/response/CustomError/CustomError'
import httpStatus from '../../utils/response/httpStatus/httpStatus'

class disciplinaEspecializacaoController {
    async post(req, res){
        const existingDiscipline = await DisciplinaEspecializacao.findOne({
            where: {
                nome: req.body.nome
            }
        })

        if(existingDiscipline) {
            throw new CustomError(`${existingDiscipline.nome} ` + MESSAGES.ALREADY_IN_SYSTEM, httpStatus.BAD_REQUEST)
        }

        const discipline = await DisciplinaEspecializacao.create({
            nome: req.body.nome,
            descricao: req.body.descricao,
            eixoTematico: req.body.eixoTematico,
            categoria: req.body.categoria
        })	

        return res.status(httpStatus.CREATED).json(discipline)
    }

    async get(_, res) {
        const disciplines = await DisciplinaEspecializacao.findAll()

        return res.status(httpStatus.SUCCESS).json(disciplines)
    }
}

export default new disciplinaEspecializacaoController()