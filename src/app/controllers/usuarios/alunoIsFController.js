import * as Yup from 'yup'

// Models
import AlunoIsF from '../../models/usuarios/alunoisf'
import Curso from '../../models/ofertacoletiva/curso'
import proeficienciaAlunoIsF from '../../models/proeficiencia/proeficienciaalunoisf'
import TurmaOC from '../../models/ofertacoletiva/turmaoc'

// Controller
import usuarioController from './usuarioController'

// Utils
import MESSAGES from '../../utils/messages/messages_pt'
import UserTypes from '../../utils/userType/userTypes'


class alunoIsFController {
    async post(req, res, deInstituicao) {
        try {
            await usuarioController.post(req, res, 'alunoisf')
            
            const existingStudent = await AlunoIsF.findOne({
                where: {
                    login: req.body.login
                }
            })
    
            if(existingStudent) {
                return 0
            }
    
            return await AlunoIsF.create({
                login: req.body.login,
                deInstituicao: deInstituicao
            })
        } catch (error) {
            return res.status(500).json(MESSAGES.INTERNAL_SERVER_ERROR + error)          
        }
    }

    async get(_, res){
        try {
            const students = await AlunoIsF.findAll({
                include: [
                    {
                        model: TurmaOC,
                        attributes: {
                            exclude: ['idTurma', 'idCurso', ]
                        },
                        include: {
                            model: Curso,
                            attributes: ['nome']
                        },
                        through: {
                            attributes: []
                        }
                    }
                ]
            })
    
            return res.status(200).json(students)
        } catch (error) {
            return res.status(500).json(MESSAGES.INTERNAL_SERVER_ERROR + error)
        }
    }

    async postProeficiencia(req, res) {
        try {
            if(!(req.tipoUsuario === UserTypes.ISF_STUDENT)){
                return res.status(403).json({
                    error: MESSAGES.ACCESS_DENIED
                })
            }
    
            const existingProeficiency = await proeficienciaAlunoIsF.findOne({
                where: {
                    login: req.loginUsuario,
                    idioma: req.body.idioma,
                    nivel: req.body.nivel
                }
            })
    
            if(existingProeficiency) {
                return res.status(422).json({
                    error: "Proeficiência " + MESSAGES.ALREADY_IN_SYSTEM
                })
            }
            
            const proeficiency = await proeficienciaAlunoIsF.create({
                login: req.loginUsuario,
                nivel: req.body.nivel,
                idioma: req.body.idioma,
                comprovante: req.body.comprovante
            })
    
            return res.status(201).json(proeficiency)    
        } catch (error) {
            return res.status(500).json(MESSAGES.INTERNAL_SERVER_ERROR + error)
        }
    }

    async getMinhaProeficiencia(req, res) {
        try {
            if(!(req.tipoUsuario === UserTypes.ISF_STUDENT)){
                return res.status(403).json({
                    error: MESSAGES.ACCESS_DENIED
                })
            }

            const proeficiaencias = await proeficienciaAlunoIsF.findAll({
                where: {
                    login: req.loginUsuario
                }
            })

            return res.status(200).json(proeficiaencias)
        } catch (error) {
            return res.status(500).json(MESSAGES.INTERNAL_SERVER_ERROR + error)
        }
    }
}

export default new alunoIsFController()