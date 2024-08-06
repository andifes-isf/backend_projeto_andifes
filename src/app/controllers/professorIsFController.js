import { Sequelize } from "sequelize";
import ProfessorIsF from "../models/professorisf";
import Usuario from "../models/usuario";
import InstituicaoEnsino from "../models/instituicaoensino";
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

        try {
            const professor = await ProfessorIsF.create({
                login: req.body.login,
                poca: req.body.poca,
                inicio: req.body.inicio,
                fim: req.body.fim
            })
    
            return res.status(201).json(professor)
        } catch (error) {
            return res.status(422).json(error.message)
        }

    }

    async get(_, res){
        try {
            const professores = await ProfessorIsF.findAll({
                include: [
                    {
                        model: Usuario,
                        attributes: {
                            include: [
                                [Sequelize.fn('CONCAT_WS', ' ', Sequelize.col('Usuario.nome'), Sequelize.col('Usuario.sobrenome')), 'nomeCompleto'],
                                [Sequelize.fn('CONCAT_WS', '@', Sequelize.col('nomeEmail'), Sequelize.col('dominio')), 'email']
                            ],
                            exclude: ['login', 'senha_encriptada', 'ativo', 'tipo', 'sobrenome', 'dominio', 'nomeEmail']
                        }
                    },
                    {
                        model: InstituicaoEnsino,
                        attributes: {
                            exclude: ['idInstituicao']
                        },
                        through: {
                            attributes: ['inicio']
                        }
                    }
                ]
            })
            
            return res.status(200).json(professores)
            
        } catch (error) {
            console.log(error)
            return res.status(400).json(error)
        }

    }
}

export default new ProfessorIsFController()