import * as Yup from 'yup'
import EditalCursoEspecializacao from '../../models/curso_especializacao/editalcursoespecializacao'

class editalEspecializacaoController {
    async get(_, res){
        try {
            const editais = await EditalCursoEspecializacao.findAll()

            return res.status(200).json(editais)
        } catch (error) {
            return res.status(500).json("Ocorreu um erro interno no servidor: " + error)
        }
    }

    async getEditalPorCoordenador(req, res){
        try {
            const editais = await EditalCursoEspecializacao.findAll({
                where: {
                    criador: req.params.criador
                }
            })

            return res.status(200).json(editais)
        } catch (error) {
            return res.status(500).json("Ocorreu um erro interno no servidor: " + error)
        }
    }
}

export default new editalEspecializacaoController()