import * as Yup from 'yup'

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

    static async verifyExistingNotification(user, id) {
        const notification = await UserRepository.getNotification(user, id)

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

    /**
     *
     * @route GET /user 
     * 
     * RETORNO
     * @returns {int} httpStatus - The value might be:
     * 200 - SUCCESS
     * 500 - INTERNAL_SERVER_ERROR
     * @returns {boolean} error
     * 
     * if return an error
     * @returns {string} message - error's message
     * @returns {string} errorName - error's name
     * 
     * if return successfully
     * @returns {ProfessorIsF} data
     */
    async get(_, res) {
        const users = await UserRepository.findAll()
        
        return res.status(httpStatus.SUCCESS).json({
            error: false,
            data: users
        })
    }

    /**
     *
     * @requires Authentication
     * @route GET /user/my_data
     * 
     * RETORNO
     * @returns {int} httpStatus - The value might be:
     * 200 - SUCCESS
     * 401 - UNAUTHORIZED
     * 500 - INTERNAL_SERVER_ERROR
     * @returns {boolean} error
     * 
     * if return an error
     * @returns {string} message - error's message
     * @returns {string} errorName - error's name
     * 
     * if return successfully
     * @returns {ProfessorIsF} data
     */
    async getMyData(req, res) {
        const user = await UserRepository.findByPk(req.loginUsuario)

        return res.status(httpStatus.SUCCESS).json({
            error: false,
            data: user
        })
    }

    /**
     *
     * @requires Authentication
     * @route GET /user/notifications
     * 
     * RETORNO
     * @returns {int} httpStatus - The value might be:
     * 200 - SUCCESS
     * 401 - UNAUTHORIZED
     * 500 - INTERNAL_SERVER_ERROR
     * @returns {boolean} error
     * 
     * if return an error
     * @returns {string} message - error's message
     * @returns {string} errorName - error's name
     * 
     * if return successfully
     * @returns {ProfessorIsF} data
     */
    async getNotificacoes(req, res){
        const user = await UserRepository.findByPk(req.loginUsuario)

        const notifications = await UserRepository.getNotifications(user) 

        return res.status(httpStatus.SUCCESS).json({
            error: false,
            data: notifications
        })
    }

    /**
     *
     * @requires UNAUTHORIZED
     * @route GET /user/unread_notifications
     * 
     * RETORNO
     * @returns {int} httpStatus - The value might be:
     * 200 - SUCCESS
     * 401 - UNAUTHORIZED
     * 500 - INTERNAL_SERVER_ERROR
     * @returns {boolean} error
     * 
     * if return an error
     * @returns {string} message - error's message
     * @returns {string} errorName - error's name
     * 
     * if return successfully
     * @returns {ProfessorIsF} data
     */
    async getNotificacoesNaoLidas(req, res){
        const user = await UserRepository.findByPk(req.loginUsuario)

        const notifications = await UserRepository.getUnreadNotifications(user)

        return res.status(httpStatus.SUCCESS).json({
            error: false,
            data: notifications
        })
    }

    /**
     * 
     * @requires Authentication
     * @route GET /user/notification/:notificationId
     * 
     * RETORNO
     * @returns {int} httpStatus - The value might be:
     * 200 - SUCCESS
     * 401 - UNAUTHORIZED
     * 500 - INTERNAL_SERVER_ERROR
     * @returns {boolean} error
     * 
     * if return an error
     * @returns {string} message - error's message
     * @returns {string} errorName - error's name
     * 
     * if return successfully
     * @returns {ProfessorIsF} data
     */
    async getNotificacao(req, res){
        const user = await UserRepository.findByPk(req.loginUsuario)

        const notification = await usuarioController.verifyExistingNotification(user, req.params.idNotificacao, req.loginUsuario)

        if (notification instanceof CustomError) {
            return res.status(httpStatus.BAD_REQUEST).json({
                error: true,
                message: notification.message,
                errorName: notification.name
            })
        }
        
        notification.lida = 1
        await notification.save()

        return res.status(httpStatus.SUCCESS).json({
            error: false,
            data: notification
        })
    }
}

export default usuarioController