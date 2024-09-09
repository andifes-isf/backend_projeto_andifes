import * as Yup from 'yup'
import proeficienciaProfessorIsF from '../../models/proeficiencia/proeficienciaprofessorisf'

class ProeficienciaProfessorIsFController {
    async post(req, res) {

        if(!(req.tipoUsuario === 'professorisf')){
            return res.status(404).json({
                error: 'Pagina nao encontrada'
            })
        }

        const proeficiaenciaExistente = await proeficienciaProfessorIsF.findOne({
            where: {
                login: req.loginUsuario,
                idioma: req.body.idioma,
                nivel: req.body.nivel
            }
        })

        if(proeficiaenciaExistente) {
            return res.status(422).json({
                msg: "Proeficiencia do professor ja cadastrada"
            })
        }

        try {
            const proeficiaencia = await proeficienciaProfessorIsF.create({
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

export default new ProeficienciaProfessorIsFController()