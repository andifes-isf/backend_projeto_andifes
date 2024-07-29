import * as Yup from 'yup'
import AlunoIsF from '../models/alunoisf'
import usuarioController from './usuarioController'

class alunoIsFController {
    async post(req, res, deInstituicao) {
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
    }

    async get(_, res){
        const alunos = await AlunoIsF.findAll()

        return res.status(200).json(alunos)
    }
}

export default new alunoIsFController()