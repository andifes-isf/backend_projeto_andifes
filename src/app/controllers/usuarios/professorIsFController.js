import { Sequelize } from "sequelize";
import ProfessorIsF from "../../models/usuarios/professorisf";
import Usuario from "../../models/usuarios/usuario";
import ComprovanteProfessorInstituicao from '../../models/usuario_pertence_instituicao/comprovanteprofessorinstituicao'
import InstituicaoEnsino from "../../models/instituicao/instituicaoensino";
import proeficienciaProfessorIsF from '../../models/proeficiencia/proeficienciaprofessorisf'
import usuarioController from "./usuarioController";

// Utils
import UserTypes from '../../utils/userType/userTypes'
import MESSAGES from '../../utils/response/messages/messages_pt'
import CustomError from "../../utils/response/CustomError/CustomError";
import httpStatus from "../../utils/response/httpStatus/httpStatus";
import ErrorType from "../../utils/response/ErrorType/ErrorType";


class ProfessorIsFController {
    static async verifyExistingTeacher(login, inicio) {
        const existingTeacher = await ProfessorIsF.findOne({
            where: {
                login: login,
                inicio: inicio
            }
        })

        if(existingTeacher) {
            return new CustomError(
                `${login}` + MESSAGES.ALREADY_IN_SYSTEM,
                ErrorType.DUPLICATE_ENTRY
            )
        }
    }

    async post(req, res, cursista) {
        const existingTeacher = await ProfessorIsFController.verifyExistingTeacher(req.body.login, req.body.inicio)
        
        console.log(existingTeacher)

        if (existingTeacher) {
            return {
                error: true,
                teacher: existingTeacher
            }
        }
        
        await usuarioController.post(req, res, cursista ? UserTypes.CURSISTA : UserTypes.ISF_TEACHER)

        const teacher = await ProfessorIsF.create({
            login: req.body.login,
            poca: req.body.poca,
            inicio: req.body.inicio,
            fim: req.body.fim,
            cursista: cursista
        })

        return {
            error: false,
            teacher: teacher
        }
    }

    async get(_, res){
        try {
            const teachers = await ProfessorIsF.findAll({
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
                        },
                    }
                ],
                logging: console.log
            })
            
            return res.status(200).json(teachers)
            
        } catch (error) {
            return res.status(500).json(MESSAGES.INTERNAL_SERVER_ERROR + error)
        }

    }

    async postProeficiencia(req, res) {
        try {
            if(!(req.tipoUsuario === UserTypes.ISF_TEACHER || req.tipoUsuario === UserTypes.CURSISTA)){
                return res.status(403).json({
                    error: MESSAGES.ACCESS_DENIED
                })
            }
    
            const existingProeficiency = await proeficienciaProfessorIsF.findOne({
                where: {
                    login: req.loginUsuario,
                    idioma: req.body.idioma,
                    nivel: req.body.nivel
                }
            })
    
            if(existingProeficiency) {
                return res.status(422).json({
                    error: `${existingProeficiency.nivel} em ${existingProeficiency.idioma} ` + MESSAGES.ALREADY_IN_SYSTEM
                })
            }
    
            const proeficiency = await proeficienciaProfessorIsF.create({
                login: req.loginUsuario,
                nivel: req.body.nivel,
                idioma: req.body.idioma,
                comprovante: req.body.comprovante
            })
    
            return res.status(201).json(proeficiency)   
        } catch (error) {
            return res.status(500).json(MESSAGES.INTERNAL_SERVER_ERROR + error)
        }
    }

    async getMinhaProeficiencia(req, res) {
        try {
            if(!(req.tipoUsuario === UserTypes.ISF_TEACHER || req.tipoUsuario === UserTypes.CURSISTA)){
                return res.status(403).json({
                    error: MESSAGES.ACCESS_DENIED
                })
            }

            const proeficiencies = await proeficienciaProfessorIsF.findAll({
                where: {
                    login: req.loginUsuario
                }
            })

            return res.status(200).json(proeficiencies)
        } catch (error) {
            return res.status(500).json(MESSAGES.INTERNAL_SERVER_ERROR + error)
        }
    }

    async postInstituicao(req, res) {  
        try {
            if(!(req.tipoUsuario === UserTypes.ISF_TEACHER || req.tipoUsuario === UserTypes.CURSISTA)){
                return res.status(403).json({
                    error: MESSAGES.ACCESS_DENIED
                })
            }
    
            const existingDocument = await ComprovanteProfessorInstituicao.findOne({
                where: {
                    login: req.loginUsuario,
                    idInstituicao: req.body.idInstituicao,
                    inicio: req.body.inicio
                }
            })
    
            if(existingDocument) {
                return res.status(409).json({
                    error: `${existingDocument.comprovante} ` + MESSAGES.ALREADY_IN_SYSTEM
                })
            }
            
            const document = await ComprovanteProfessorInstituicao.create({
                idInstituicao: req.body.idInstituicao,
                login: req.loginUsuario,
                inicio: req.body.inicio,
                termino: req.body.termino || null,
                comprovante: req.body.comprovante
            })
    
            return res.status(201).json(document)    
        } catch (error) {
            return res.status(500).json(MESSAGES.INTERNAL_SERVER_ERROR + error)
        }
    }

    async getMinhasInstituicoes(req, res){
        try {
            if(!(req.tipoUsuario === UserTypes.ISF_TEACHER || req.tipoUsuario === UserTypes.CURSISTA)){
                return res.status(403).json({
                    error: MESSAGES.ACCESS_DENIED
                })
            }

            const documents = await ComprovanteProfessorInstituicao.findAll({
                where: {
                    login: req.loginUsuario
                }
            })

            return res.status(200).json(documents)
        } catch (error) {
            return res.status(500).json(MESSAGES.INTERNAL_SERVER_ERROR + error)
        }
    }

    async getInstituicaoAtual(req, res){
        try {
            if(!(req.tipoUsuario === UserTypes.ISF_TEACHER || req.tipoUsuario === UserTypes.CURSISTA)){
                return res.status(403).json({
                    error: MESSAGES.ACCESS_DENIED
                })
            }

            const document = await ComprovanteProfessorInstituicao.findOne({
                where: {
                    login: req.loginUsuario
                }
            })

            return res.status(200).json(document)
        } catch (error) {
            return res.status(500).json(MESSAGES.INTERNAL_SERVER_ERROR + error)
        }
    }
}

export default new ProfessorIsFController()