import * as Yup from 'yup'

// Models
import AlunoIsF from '../../models/usuarios/alunoisf'
import Curso from '../../models/ofertacoletiva/curso'
import proeficienciaAlunoIsF from '../../models/proeficiencia/proeficienciaalunoisf'
import TurmaOC from '../../models/ofertacoletiva/turmaoc'

// Controller
import usuarioController from './usuarioController'


class alunoIsFController {
    async post(req, res, deInstituicao) {
        try {
            await usuarioController.post(req, res, 'alunoisf')
            
            const alunoExistente = await AlunoIsF.findOne({
                where: {
                    login: req.body.login
                }
            })
    
            if(alunoExistente) {
                return 0
            }
    
            return await AlunoIsF.create({
                login: req.body.login,
                deInstituicao: deInstituicao
            })
        } catch (error) {
            return res.status(500).json("Ocorreu um erro interno no servidor: " + error)            
        }
    }

    async get(_, res){
        try {
            const alunos = await AlunoIsF.findAll({
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
    
            return res.status(200).json(alunos)
        } catch (error) {
            return res.status(500).json("Ocorreu um erro interno no servidor: " + error)
        }
    }

    async postProeficiencia(req, res) {
        try {
            if(!(req.tipoUsuario === 'alunoisf')){
                return res.status(403).json({
                    error: 'Acesso negado'
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
                    msg: "Proeficiencia do aluno ja cadastrada"
                })
            }
            
            const proeficiaencia = await proeficienciaAlunoIsF.create({
                login: req.loginUsuario,
                nivel: req.body.nivel,
                idioma: req.body.idioma,
                comprovante: req.body.comprovante
            })
    
            return res.status(201).json(proeficiaencia)    
        } catch (error) {
            return res.status(500).json("Ocorreu um erro interno no servidor: " + error)
        }
    }

    async getMinhaProeficiencia(req, res) {
        try {
            if(!(req.tipoUsuario === "alunoisf")){
                return res.status(403).json({
                    error: "Acesso negado"
                })
            }

            const proeficiaencias = await proeficienciaAlunoIsF.findAll({
                where: {
                    login: req.loginUsuario
                }
            })

            return res.status(200).json(proeficiaencias)
        } catch (error) {
            return res.status(500).json("Ocorreu um erro interno no servidor: " + error)
        }
    }
}

export default new alunoIsFController()