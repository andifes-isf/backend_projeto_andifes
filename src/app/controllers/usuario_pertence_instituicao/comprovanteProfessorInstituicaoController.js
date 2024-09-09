import * as Yup from 'yup'
import ComprovanteProfessorInstituicao from '../../models/usuario_pertence_instituicao/comprovanteprofessorinstituicao'

class ComprovanteProfessorInstituicaoController {
    async post(req, res) {  
        try {
            if(!(req.tipoUsuario === 'professorisf')){
                console.log(req.tipoUsuario)
                return res.status(403).json({
                    error: 'Pagina nao encontrada'
                })
            }
    
            const comprovanteExistente = await ComprovanteProfessorInstituicao.findOne({
                where: {
                    login: req.loginUsuario,
                    idInstituicao: req.body.idInstituicao,
                    inicio: req.body.inicio
                }
            })
    
            if(comprovanteExistente) {
                return res.status(409).json({
                    msg: "Comprovante de Professor ja cadastrado"
                })
            }
            
            const comprovante = await ComprovanteProfessorInstituicao.create({
                idInstituicao: req.body.idInstituicao,
                login: req.loginUsuario,
                inicio: req.body.inicio,
                termino: req.body.termino || null,
                comprovante: req.body.comprovante
            })
    
            return res.status(201).json(comprovante)    
        } catch (error) {
            return res.status(500).json(error.message)
        }

    }
}

export default new ComprovanteProfessorInstituicaoController()