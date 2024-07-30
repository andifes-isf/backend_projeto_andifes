import * as Yup from 'yup'
import AlunoDeInstituicao from '../models/alunodeinstituicao'
import alunoIsFController from './alunoIsFController'
import InstituicaoEnsino from '../models/instituicaoensino'
import AlunoIsF from '../models/alunoisf'
import Usuario from '../models/usuario'

class alunoDeinstituicaoController {
    async post(req, res) {
        await alunoIsFController.post(req, res, 1)
        
        const alunoExistente = await AlunoDeInstituicao.findOne({
            where: {
                login: req.body.login
            }
        })

        if(alunoExistente) {
            return res.status(400).json({
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
            return res.status(400).json(error)
        }
    }
}

export default new alunoDeinstituicaoController()