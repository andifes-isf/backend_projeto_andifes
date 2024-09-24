import * as Yup from 'yup'

// Models
import AlunoDeInstituicao from '../../models/usuarios/alunodeinstituicao'
import AlunoIsF from '../../models/usuarios/alunoisf'
import ComprovanteAlunoInstituicao from '../../models/usuario_pertence_instituicao/comprovantealunoinstituicao'
import InstituicaoEnsino from '../../models/instituicao/instituicaoensino'
import Usuario from '../../models/usuarios/usuario'

// Controller
import alunoIsFController from './alunoIsFController'

class alunoDeinstituicaoController {
    async post(req, res) {
        try {
            await alunoIsFController.post(req, res, 1)
            
            const alunoExistente = await AlunoDeInstituicao.findOne({
                where: {
                    login: req.body.login
                }
            })
    
            if(alunoExistente) {
                return res.status(409).json({
                    msg: "Aluno de Instituicao ja cadastrado"
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
            return res.status(500).json("Ocorreu um erro interno no servidor: " + error)
        }

    }

    async get(_, res) {
        try {
            const alunos = await AlunoDeInstituicao.findAll({
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

            return res.status(200).json(alunos)
        } catch (error) {
            return res.status(500).json("Ocorreu um erro interno no servidor: " + error)
        }
    }


    // Aqui tem que ser especificamente o alunoDeInstituicao, mas não sei a melhor forma de fazer isso
    async postInstituicao(req, res){
        try {
            if(!(req.tipoUsuario === 'alunoisf')){
                return res.status(403).json({
                    error: 'Acesso negado'
                })
            }

            const comprovanteExistente = await ComprovanteAlunoInstituicao.findOne({
                where: {
                    login: req.loginUsuario,
                    idInstituicao: req.body.idInstituicao,
                    inicio: req.body.inicio
                }
            })
    
            if(comprovanteExistente) {
                return res.status(409).json({
                    msg: "Comprovante de Aluno ja cadastrado"
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
            return res.status(500).json(error.message)
        }
    }

    async getMinhasInstituicoes(req, res){
        try {
            if(!(AlunoDeInstituicao.findOne({where: {login: req.loginUsuario}}))){
                return res.status(403).json({
                    error: 'Acesso negado'
                })
            }

            const comprovantes = await ComprovanteAlunoInstituicao.findAll({
                where: {
                    login: req.loginUsuario
                }
            })

            return res.status(200).json(comprovantes)
        } catch (error) {
            return res.status(500).json('Ocorreu um erro interno no servidor: ' + error)
        }
    }

    async getInstituicaoAtual(req, res){
        try {
            if(!(AlunoDeInstituicao.findOne({where: {login: req.loginUsuario}}))){
                return res.status(403).json({
                    error: 'Acesso negado'
                })
            }

            const comprovante = await ComprovanteAlunoInstituicao.findOne({
                where: {
                    login: req.loginUsuario
                }
            })

            return res.status(200).json(comprovante)
        } catch (error) {
            return res.status(500).json('Ocorreu um erro interno no servidor: ' + error)
        }
    }
}

export default new alunoDeinstituicaoController()