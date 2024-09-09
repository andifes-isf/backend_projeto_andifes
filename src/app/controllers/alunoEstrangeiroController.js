import * as Yup from 'yup'
import AlunoEstrangeiro from '../models/usuarios/alunoestrangeiro'
import alunoIsFController from './alunoIsFController'
import AlunoIsF from '../models/usuarios/alunoisf'
import Usuario from '../models/usuarios/usuario'

class alunoEstrangeiroController {
    async post(req, res) {
        try {
            await alunoIsFController.post(req, res, 0)
            
            const alunoExistente = await AlunoEstrangeiro.findOne({
                where: {
                    login: req.body.login
                }
            })
    
            if(alunoExistente) {
                return res.status(409).json({
                    msg: "Aluno de Instituicao ja cadastrado"
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
            return res.status(500).json("Ocorreu um erro interno no servidor: " + error)
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
            return res.status(500).json("Ocorreu um erro interno no servidor: " + error)
        }
    }
}

export default new alunoEstrangeiroController()