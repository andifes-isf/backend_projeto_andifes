import { Sequelize } from "sequelize";
import ProfessorIsF from "../../models/usuarios/professorisf";
import Usuario from "../../models/usuarios/usuario";
import ComprovanteProfessorInstituicao from '../../models/usuario_pertence_instituicao/comprovanteprofessorinstituicao'
import InstituicaoEnsino from "../../models/instituicao/instituicaoensino";
import proeficienciaProfessorIsF from '../../models/proeficiencia/proeficienciaprofessorisf'
import usuarioController from "./usuarioController";

class ProfessorIsFController {
    async post(req, res, cursista) {
        try {
            await usuarioController.post(req, res, cursista ? 'cursista' : 'professorisf')
    
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
                fim: req.body.fim,
                cursista: cursista
            })
        } catch (error) {
            throw new Error(error)
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

    async postProeficiencia(req, res) {
        try {
            if(!(req.tipoUsuario === "professorisf" || req.tipoUsuario === "cursista")){
                return res.status(403).json({
                    error: 'Acesso negado'
                })
            }
    
            const proeficiaenciaExistente = await proeficienciaProfessorIsF.findOne({
                where: {
                    login: req.loginUsuario,
                    idioma: req.body.idioma,
                    nivel: req.body.nivel
                }
            })
    
            if(proeficiaenciaExistente) {
                return res.status(422).json({
                    msg: "Proeficiencia do professor ja cadastrada"
                })
            }
    
            const proeficiencia = await proeficienciaProfessorIsF.create({
                login: req.loginUsuario,
                nivel: req.body.nivel,
                idioma: req.body.idioma,
                comprovante: req.body.comprovante
            })
    
            return res.status(201).json(proeficiencia)   
        } catch (error) {
            return res.status(500).json("Ocorreu um erro interno no servidor: " + error)
        }
    }

    async getMinhaProeficiencia(req, res) {
        try {
            if(!(req.tipoUsuario === "professorisf" || req.tipoUsuario === "cursista")){
                return res.status(403).json({
                    error: "Acesso negado"
                })
            }

            const proeficiencias = await proeficienciaProfessorIsF.findAll({
                where: {
                    login: req.loginUsuario
                }
            })

            return res.status(200).json(proeficiencias)
        } catch (error) {
            return res.status(500).json('Ocorreu um erro interno no servidor: ' + error)
        }
    }

    async postInstituicao(req, res) {  
        try {
            if(!(req.tipoUsuario === "professorisf" || req.tipoUsuario === "cursista")){
                console.log(req.tipoUsuario)
                return res.status(403).json({
                    error: 'Acesso negado'
                })
            }
    
            const comprovanteExistente = await ComprovanteProfessorInstituicao.findOne({
                where: {
                    login: req.loginUsuario,
                    idInstituicao: req.body.idInstituicao,
                    inicio: req.body.inicio
                }
            })
    
            if(comprovanteExistente) {
                return res.status(409).json({
                    msg: "Comprovante de Professor ja cadastrado"
                })
            }
            
            const comprovante = await ComprovanteProfessorInstituicao.create({
                idInstituicao: req.body.idInstituicao,
                login: req.loginUsuario,
                inicio: req.body.inicio,
                termino: req.body.termino || null,
                comprovante: req.body.comprovante
            })
    
            return res.status(201).json(comprovante)    
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    async getMinhasInstituicoes(req, res){
        try {
            if(!(req.tipoUsuario === "professorisf" || req.tipoUsuario === "cursista")){
                return res.status(403).json({
                    error: 'Acesso negado'
                })
            }

            const comprovantes = await ComprovanteProfessorInstituicao.findAll({
                where: {
                    login: req.loginUsuario
                }
            })

            return res.status(200).json(comprovantes)
        } catch (error) {
            return res.status(500).json('Ocorreu um erro interno no servidor: ' + error)
        }
    }

    async getInstituicaoAtual(req, res){
        try {
            if(!(req.tipoUsuario === "professorisf" || req.tipoUsuario === "cursista")){
                return res.status(403).json({
                    error: 'Acesso negado'
                })
            }

            const comprovante = await ComprovanteProfessorInstituicao.findOne({
                where: {
                    login: req.loginUsuario
                }
            })

            return res.status(200).json(comprovante)
        } catch (error) {
            return res.status(500).json('Ocorreu um erro interno no servidor: ' + error)
        }
    }
}

export default new ProfessorIsFController()