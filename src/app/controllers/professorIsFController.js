import { Sequelize } from "sequelize";
import ProfessorIsF from "../models/professorisf";
import Usuario from "../models/usuario";
import InstituicaoEnsino from "../models/instituicaoensino";
import usuarioController from "./usuarioController";

class ProfessorIsFController {
    async post(req, res) {
        try {
            await usuarioController.post(req, res, 'professorisf')
    
            const professorExistente = await ProfessorIsF.findOne({
                where: {
                    login: req.body.login,
                    inicio: req.body.inicio
                }
            })
    
            if(professorExistente) {
                return 0
            }
            
            return await ProfessorIsF.create({
                login: req.body.login,
                poca: req.body.poca,
                inicio: req.body.inicio,
                fim: req.body.fim
            })
        } catch (error) {
            return res.status(500).json("Ocorreu um erro interno no servidor: " + error)
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

                        // Precisaria testar, mas acredito que se quisermos pegar todas as relações que um professor tem com alguma instituição de ensino, a gente teria que 
                        // incluir primeiro o comprovanteprofessorinstituicao e através dele incluir as instituicoesensino

                        model: InstituicaoEnsino,
                        attributes: {
                            exclude: ['idInstituicao']
                        },
                        through: {
                            attributes: ['inicio']
                        },
                    }
                ],
                logging: console.log
            })
            
            return res.status(200).json(professores)
            
        } catch (error) {
            return res.status(500).json("Ocorreu um erro interno no servidor: " + error)
        }

    }
}

export default new ProfessorIsFController()