import * as Yup from 'yup'

// Models
import OuvidoriaCursoEspecializacao from '../../models/curso_especializacao/ouvidoria_curso_especializacao'
import CursistaEspecializacao from '../../models/usuarios/cursistaespecializacao'

// Utils
import httpStatus from '../../utils/response/httpStatus/httpStatus'
import CustomError from '../../utils/response/CustomError/CustomError'
import MESSAGES from '../../utils/response/messages/messages_pt'

class OuvidoriaCursoEspecializacaoController {
    async get(_, res){
        const reclamations = await OuvidoriaCursoEspecializacao.findAll()

        return res.status(httpStatus.CREATED).json({
            error: false,
            reclamations
        })
    }
}

export default new OuvidoriaCursoEspecializacaoController()