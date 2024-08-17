import { Sequelize } from "sequelize";
import CursistaEspecializacao from "../models/cursistaespecializacao";
import Usuario from "../models/usuario";
import ProfessorIsF from "../models/professorisf";
import ProfessorIsFController from '../controllers/professorIsFController'

class CursistaEspecializacaoController {
    async post(req, res) {
        try {    
            await ProfessorIsFController.post(req, res)
            
            const cursistaExistente = await CursistaEspecializacao.findOne({
                where: {
                    login: req.body.login
                }
            })
    
            if(cursistaExistente) {
                return res.status(409).json({
                    msg: "Cursista de especializacao ja cadastrado"
                })
            }
            
            const cursista = await CursistaEspecializacao.create({
                login: req.body.login
            })
    
            return res.status(201).json(cursista)
        } catch (error) {
            return res.status(500).json("Ocorreu um erro interno no servidor: " + error)
        }

    }

    async get(_, res){
        try {
            const cursistas = await CursistaEspecializacao.findAll({
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
            
            return res.status(200).json(cursistas)
            
        } catch (error) {
            console.log(error)
            return res.status(500).json("Ocorreu um erro interno no servidor: " + error)
        }

    }
}

export default new CursistaEspecializacaoController()