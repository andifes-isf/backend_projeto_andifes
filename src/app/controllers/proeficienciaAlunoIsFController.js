import * as Yup from 'yup'
import proeficienciaAlunoIsF from '../models/proeficienciaalunoisf'

class ProeficienciaAlunoIsFController {
    async post(req, res) {

        if(!(req.tipoUsuario === 'alunoisf')){
            return res.status(404).json({
                error: 'Pagina nao encontrada'
            })
        }

        const proeficiaenciaExistente = await proeficienciaAlunoIsF.findOne({
            where: {
                login: req.loginUsuario,
                idioma: req.body.idioma,
                nivel: req.body.nivel
            }
        })

        if(proeficiaenciaExistente) {
            return res.status(422).json({
                msg: "Proeficiencia do aluno ja cadastrado"
            })
        }

        try {
            const proeficiaencia = await proeficienciaAlunoIsF.create({
                login: req.loginUsuario,
                nivel: req.body.nivel,
                idioma: req.body.idioma,
                comprovante: req.body.comprovante
            })
    
            return res.status(201).json(proeficiaencia)    
        } catch (error) {
            return res.status(422).json(error.message)
        }

    }
}

export default new ProeficienciaAlunoIsFController()