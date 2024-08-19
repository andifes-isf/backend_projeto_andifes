import { Sequelize } from "sequelize";
import AlunoGraduacao from "../models/alunograduacao";
import Usuario from "../models/usuario";
import ProfessorIsF from "../models/professorisf";
import ProfessorIsFController from './professorIsFController'

class AlunoGraduacaoController {
    async post(req, res) {
        try {    
            await ProfessorIsFController.post(req, res, 0)
            
            const alunoGraduacaoExistente = await AlunoGraduacao.findOne({
                where: {
                    login: req.body.login
                }
            })
    
            if(alunoGraduacaoExistente) {
                return res.status(409).json({
                    msg: "Cursista de especializacao ja cadastrado"
                })
            }
            
            const cursista = await AlunoGraduacao.create({
                login: req.body.login
            })
    
            return res.status(201).json(cursista)
        } catch (error) {
            return res.status(500).json("Ocorreu um erro interno no servidor: " + error)
        }

    }

    async get(_, res){
        try {
            const alunos = await AlunoGraduacao.findAll({
                include: [
                    {
                        model: ProfessorIsF,
                        attributes: {
                            exclude: ['login'],
                        },
                        include: [{
                            model: Usuario,
                            attributes: {
                                exclude: ['login', 'senha_encriptada', 'ativo', 'tipo']
                            }
                        }]
                    }
                ],
                logging: console.log
            })
            
            return res.status(200).json(alunos)
            
        } catch (error) {
            console.log(error)
            return res.status(500).json("Ocorreu um erro interno no servidor: " + error)
        }

    }
}

export default new AlunoGraduacaoController()