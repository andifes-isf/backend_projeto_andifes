import { Sequelize } from "sequelize";
import ProfessorIsF from "../models/professorisf";
import Usuario from "../models/usuario";
import usuarioController from "./usuarioController";

class ProfessorIsFController {
    async post(req, res) {
        await usuarioController.post(req, res, 'professorisf')

        const professorExistente = await ProfessorIsF.findOne({
            where: {
                login: req.body.login,
                inicio: req.body.inicio
            }
        })

        if(professorExistente) {
            return res.status(422).json({
                msg: "Professor IsF ja cadastrado"
            })
        }

        const professor = await ProfessorIsF.create({
            login: req.body.login,
            poca: req.body.poca,
            inicio: req.body.inicio,
            fim: req.body.fim
        })

        return res.status(201).json(professor)
    }

    async get(_, res){
        try {
            const professores = await ProfessorIsF.findAll({
                include: [
                    {
                        model: Usuario,
                        attributes: {
                            include: [
                                [Sequelize.fn('CONCAT_WS', ' ', Sequelize.col('nome'), Sequelize.col('sobrenome')), 'nome'],
                                [Sequelize.fn('CONCAT_WS', '@', Sequelize.col('nomeEmail'), Sequelize.col('dominio')), 'email']
                            ],
                            exclude: ['login', 'senha_encriptada', 'ativo', 'tipo', 'sobrenome', 'dominio', 'nomeEmail']
                        }
                    }
                ]
            })
            
            return res.status(200).json(professores)
            
        } catch (error) {
            return res.status(400).json(error)
        }

    }
}

export default new ProfessorIsFController()