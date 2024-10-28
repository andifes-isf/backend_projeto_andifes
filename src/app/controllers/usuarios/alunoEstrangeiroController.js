import * as Yup from 'yup'
import AlunoEstrangeiro from '../../models/usuarios/alunoestrangeiro'
import alunoIsFController from './alunoIsFController'
import AlunoIsF from '../../models/usuarios/alunoisf'
import Usuario from '../../models/usuarios/usuario'
import MESSAGES from '../../utils/messages/messages_pt'

class alunoEstrangeiroController {
    async post(req, res) {
        try {
            await alunoIsFController.post(req, res, 0)
            
            const existingStudent = await AlunoEstrangeiro.findOne({
                where: {
                    login: req.body.login
                }
            })
    
            if(existingStudent) {
                return res.status(409).json({
                    error: `${existingStudent.login} ` + MESSAGES.ALREADY_IN_SYSTEM
                })
            }
    
            const aluno = await AlunoEstrangeiro.create({
                paisOrigem: req.body.paisOrigem,
                comprovante: req.body.comprovante,
                tipo: req.body.tipo,
                login: req.body.login,
                codigo: req.body.codigo
            })
        
            return res.status(201).json(aluno)
        } catch (error) {
            console.log(error)
            return res.status(500).json(MESSAGES.INTERNAL_SERVER_ERROR + error)
        }

    }

    async get(_, res) {
        try {
            const alunos = await AlunoEstrangeiro.findAll({
                include: [
                    {
                        model: AlunoIsF,
                        attributes: {
                            exclude: ['login']
                        },
                        include: [{
                            model: Usuario,
                            attributes: {
                                exclude: ['login', 'senha_encriptada', 'ativo', 'tipo']
                            }
                        }]
                    }
                ]
            })

            return res.status(200).json(alunos)
        } catch (error) {
            return res.status(500).json(MESSAGES.INTERNAL_SERVER_ERROR + error)
        }
    }
}

export default new alunoEstrangeiroController()