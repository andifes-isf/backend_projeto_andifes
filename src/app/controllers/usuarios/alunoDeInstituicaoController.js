import * as Yup from 'yup'

// Models
import AlunoDeInstituicao from '../../models/usuarios/alunodeinstituicao'
import AlunoIsF from '../../models/usuarios/alunoisf'
import ComprovanteAlunoInstituicao from '../../models/usuario_pertence_instituicao/comprovantealunoinstituicao'
import InstituicaoEnsino from '../../models/instituicao/instituicaoensino'
import Usuario from '../../models/usuarios/usuario'

// Controller
import alunoIsFController from './alunoIsFController'

import MESSAGES from '../../utils/messages/messages_pt'
import UserTypes from '../../utils/userType/userTypes'

class alunoDeinstituicaoController {
    async post(req, res) {
        try {
            await alunoIsFController.post(req, res, 1)
            
            const existingStudent = await AlunoDeInstituicao.findOne({
                where: {
                    login: req.body.login
                }
            })
    
            if(existingStudent) {
                return res.status(409).json({
                    error: `${existingStudent.login} ` + MESSAGES.ALREADY_IN_SYSTEM
                })
            }
    
            const aluno = await AlunoDeInstituicao.create({
                nDocumento: req.body.nDocumento,
                cargo: req.body.cargo,
                areaAtuacao: req.body.areaAtuacao,
                login: req.body.login
            })
        
            return res.status(201).json(aluno)
        } catch (error) {
            return res.status(500).json(MESSAGES.INTERNAL_SERVER_ERROR + error)
        }

    }

    async get(_, res) {
        try {
            const students = await AlunoDeInstituicao.findAll({
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
                    },    
                    {
                        model: InstituicaoEnsino,
                        attributes: {
                            exclude: ['idInstituicao']
                        },
                        through: {
                            attributes: {
                                exclude: ['login', 'idInstituicao'],
                                include: ['inicio']
                            }
                        }
                    }
                ]
            })

            return res.status(200).json(students)
        } catch (error) {
            return res.status(500).json(MESSAGES.INTERNAL_SERVER_ERROR + error)
        }
    }

    async postInstituicao(req, res){
        try {
            if(!(req.tipoUsuario === UserTypes.ISF_STUDENT)){
                return res.status(403).json({
                    error: MESSAGES.ACCESS_DENIED
                })
            }

            const existingRegistrantion = await ComprovanteAlunoInstituicao.findOne({
                where: {
                    login: req.loginUsuario,
                    idInstituicao: req.body.idInstituicao,
                    inicio: req.body.inicio
                }
            })
    
            if(existingRegistrantion) {
                return res.status(409).json({
                    error: `${existingRegistrantion.comprovante} ` + MESSAGES.ALREADY_IN_SYSTEM
                })
            }
            
            const comprovante = await ComprovanteAlunoInstituicao.create({
                idInstituicao: req.body.idInstituicao,
                login: req.loginUsuario,
                inicio: req.body.inicio,
                termino: req.body.termino || null,
                comprovante: req.body.comprovante
            })
    
            return res.status(201).json(comprovante)    
        } catch (error) {
            return res.status(500).json(MESSAGES.INTERNAL_SERVER_ERROR + error)
        }
    }

    async getMinhasInstituicoes(req, res){
        try {
            if(!(req.tipoUsuario === UserTypes.ISF_STUDENT)){
                return res.status(403).json({
                    error: MESSAGES.ACCESS_DENIED
                })
            }

            const registrations = await ComprovanteAlunoInstituicao.findAll({
                where: {
                    login: req.loginUsuario
                }
            })

            return res.status(200).json(registrations)
        } catch (error) {
            return res.status(500).json(MESSAGES.INTERNAL_SERVER_ERROR + error)
        }
    }

    async getInstituicaoAtual(req, res){
        try {
            if(!(req.tipoUsuario === UserTypes.ISF_STUDENT)){
                return res.status(403).json({
                    error: MESSAGES.ACCESS_DENIED
                })
            }

            const registration = await ComprovanteAlunoInstituicao.findOne({
                where: {
                    login: req.loginUsuario
                }
            })

            return res.status(200).json(registration)
        } catch (error) {
            return res.status(500).json(MESSAGES.INTERNAL_SERVER_ERROR + error)
        }
    }
}

export default new alunoDeinstituicaoController()