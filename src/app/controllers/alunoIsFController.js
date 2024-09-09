import * as Yup from 'yup'
import AlunoIsF from '../models/usuarios/alunoisf'
import usuarioController from './usuarioController'
import TurmaOC from '../models/ofertacoletiva/turmaoc'
import Curso from '../models/ofertacoletiva/curso'

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
}

export default new alunoIsFController()