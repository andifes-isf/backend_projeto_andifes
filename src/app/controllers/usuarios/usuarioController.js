import * as Yup from 'yup'
import Usuario from '../../models/usuarios/usuario'

// Utils
import EmailDomainFactory from '../../utils/emailDomain/emailDomainFactory'
import MESSAGES from '../../utils/response/messages/messages_pt'
import CustomError from '../../utils/response/CustomError/CustomError'
import ErrorType from '../../utils/response/ErrorType/ErrorType'
import httpStatus from '../../utils/response/httpStatus/httpStatus'

// Repository
import UserRepository from '../../repositories/user/UserRepository'

class usuarioController {
    // AUXILIAR FUNCTIONS

    static verifyUserType(userTypes, userType) {
        const founded = userTypes.find((type) => {
            return type == userType
        })

        if (typeof founded === "undefined") {
            return new CustomError(
                MESSAGES.ACCESS_DENIED,
                ErrorType.UNAUTHORIZED_ACCESS
            )
        }
    }

    static async verifyNonExistingObject(repository, key, message) {
        const existingObject = await repository.findByPk(key)

        if (existingObject == null) {
            return new CustomError(
                message + key,
                ErrorType.NOT_FOUND
            )
        }
    }

    static async verifyExistingObject(repository, key, message) {
        const existingObject = await repository.findByPk(key)

        if (existingObject) {

            return new CustomError(
                message + key,
                ErrorType.DUPLICATE_ENTRY
            )
        }
    }

    static async verifyExistingNotification(user, id, login) {
        const notification = await user.getNotificacaos({
            where: {
                idNotificacao: id,
                login: login
            }
        }) 

        if(notification.length === 0){
            return new CustomError(
                MESSAGES.NOTIFICATION_NOT_FOUND + id,
                ErrorType.NOT_FOUND
            )
        }

        return notification[0]
    }

    static async postUser(req, _, type) {
        const existingUser = await usuarioController.verifyExistingObject(UserRepository, req.body.login, MESSAGES.EXISTING_USER)

        if(existingUser) {
            return {
                error: true,
                user: existingUser
            }
        }

        const user = await UserRepository.create({
            login: req.body.login,
            name: req.body.name,
            surname: req.body.surname,
            DDI: req.body.DDI,
            DDD: req.body.DDD,
            phone: req.body.phone,
            ethnicity: req.body.ethnicity,
            gender: req.body.gender,
            active: 1,
            email: req.body.email,
            email_domain: req.body.email_domain,
            password: req.body.password,
            type: type
        })

        return {
            error: false,
            user: user
        }
    }
    
    // ENDPOINTS

    async get(_, res) {
        const users = await Usuario.findAll()
        
        return res.status(httpStatus.SUCCESS).json({
            error: false,
            users
        })
    }

    async getMyData(req, res) {
        const user = await Usuario.findOne({
            where: {
                login: req.loginUsuario
            }
        })

        return res.status(httpStatus.SUCCESS).json({
            error: false,
            user
        })
    }

    async getNotificacoes(req, res){
        const user = await Usuario.findByPk(req.loginUsuario)

        const notifications = await user.getNotificacaos() 

        return res.status(httpStatus.SUCCESS).json({
            error: false,
            notifications
        })
    }

    async getNotificacoesNaoLidas(req, res){
        const user = await Usuario.findByPk(req.loginUsuario)

        const notifications = await user.getNotificacoesNaoLidas() 

        return res.status(httpStatus.SUCCESS).json({
            error: false,
            notifications
        })
    }

    async getNotificacao(req, res){
        const user = await Usuario.findByPk(req.loginUsuario)

        const notification = await usuarioController.verifyExistingNotification(user, req.params.idNotificacao, req.loginUsuario)

        if (notification instanceof CustomError) {
            return res.status(httpStatus.SUCCESS).json({
                error: true,
                message: notification.message,
                errorName: notification.name
            })
        }
        
        notification.lida = 1
        await notification.save()

        return res.status(httpStatus.SUCCESS).json({
            error: false,
            notification
        })
    }
}

export default usuarioController