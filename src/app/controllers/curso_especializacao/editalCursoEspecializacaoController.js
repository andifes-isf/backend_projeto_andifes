import * as Yup from 'yup'

// Models
import EditalCursoEspecializacao from '../../models/curso_especializacao/editalcursoespecializacao'

// Utils
import httpStatus from '../../utils/httpStatus/httpStatus'

class editalEspecializacaoController {
    async get(_, res){
        const notices = await EditalCursoEspecializacao.findAll()

        return res.status(httpStatus.CREATED).json(notices)
    }

    async getEditalPorCoordenador(req, res){
        const notices = await EditalCursoEspecializacao.findAll({
            where: {
                criador: req.params.criador
            }
        })

        return res.status(httpStatus.SUCCESS).json(notices)
    }
}

export default new editalEspecializacaoController()