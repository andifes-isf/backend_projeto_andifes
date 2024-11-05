import * as Yup from 'yup'

// Models
import AlunoDeInstituicao from '../../models/usuarios/alunodeinstituicao'
import AlunoIsF from '../../models/usuarios/alunoisf'
import ComprovanteAlunoInstituicao from '../../models/usuario_pertence_instituicao/comprovantealunoinstituicao'
import InstituicaoEnsino from '../../models/instituicao/instituicaoensino'
import Usuario from '../../models/usuarios/usuario'

// Controller
import alunoIsFController from './alunoIsFController'

// Utils
import { Op } from 'sequelize'
import CustomError from '../../utils/CustomError/CustomError'
import MESSAGES from '../../utils/messages/messages_pt'
import httpStatus from '../../utils/httpStatus/httpStatus'
import UserTypes from '../../utils/userType/userTypes'

class alunoDeinstituicaoController {
    static verifyAuthorization(userType) {
        if(!(userType === UserTypes.ISF_STUDENT)){
            throw new CustomError(MESSAGES.ACCESS_DENIED, httpStatus.UNAUTHORIZED)
        }
    }

    static async verifyExistingInstitutionStudent(login) {
        const student = await AlunoDeInstituicao.findByPk(login)

        if(student) {
            throw new CustomError(login + MESSAGES.ALREADY_IN_SYSTEM, httpStatus.BAD_REQUEST)
        }
    }

    async post(req, res) {
        await alunoIsFController.post(req, res, 1)

        await alunoDeinstituicaoController.verifyExistingInstitutionStudent(req.loginUsuario)

        const student = await AlunoDeInstituicao.create({
            nDocumento: req.body.nDocumento,
            cargo: req.body.cargo,
            areaAtuacao: req.body.areaAtuacao,
            login: req.body.login
        })
    
        return res.status(httpStatus.CREATED).json(student)
    }

    async get(_, res) {
        const students = await AlunoDeInstituicao.findAll({
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
                    as: "institution",
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

        return res.status(httpStatus.SUCCESS).json(students)
    }

    static async verifyExistingInstitution(institutionId) {
        const institution = await InstituicaoEnsino.findByPk(institutionId)

        if(!institution) {
            throw new CustomError(`Instituição ${institutionId}` + MESSAGES.NOT_FOUND, httpStatus.BAD_REQUEST)
        }
    }

    static async verifyExistingRegistration(login, institutionId, begin) {
        const existingRegistrantion = await ComprovanteAlunoInstituicao.findOne({
            where: {
                login: login,
                idInstituicao: institutionId,
                inicio: begin
            }
        })

        if(existingRegistrantion) {
            throw new CustomError(existingRegistrantion.comprovante + MESSAGES.ALREADY_IN_SYSTEM, httpStatus.BAD_REQUEST)
        }
    }

    static async closeRegistration(login, institutionId) {
        const registration = await ComprovanteAlunoInstituicao.findOne({
            where: {
                login: login,
                termino: {
                    [Op.is]: null
                }
            }
        })

        registration.termino = new Date().toISOString().split("T")[0]
        registration.save()
    }

    async postInstituicao(req, res){
        alunoDeinstituicaoController.verifyAuthorization(req.tipoUsuario)

        await alunoDeinstituicaoController.verifyExistingInstitution(req.params.idInstituicao)

        await alunoDeinstituicaoController.verifyExistingRegistration(req.loginUsuario, req.params.idInstituicao, req.body.inicio)

        await alunoDeinstituicaoController.closeRegistration(req.loginUsuario, req.params.idInstituicao)
        
        const registration = await ComprovanteAlunoInstituicao.create({
            idInstituicao: req.params.idInstituicao,
            login: req.loginUsuario,
            inicio: req.body.inicio,
            comprovante: req.body.comprovante
        })

        return res.status(httpStatus.CREATED).json(registration)  
    }

    async getMinhasInstituicoes(req, res){
        alunoDeinstituicaoController.verifyAuthorization(req.tipoUsuario)

        const registrations = await ComprovanteAlunoInstituicao.findAll({
            where: {
                login: req.loginUsuario
            }
        })

        return res.status(httpStatus.SUCCESS).json(registrations)
    }

    async getInstituicaoAtual(req, res){
        alunoDeinstituicaoController.verifyAuthorization(req.tipoUsuario)

        const registration = await ComprovanteAlunoInstituicao.findOne({
            where: {
                login: req.loginUsuario,
                termino: {
                    [Op.is]: null
                }
            }
        })

        return res.status(httpStatus.SUCCESS).json(registration)
    }
}

export default new alunoDeinstituicaoController()