// Model
import User from '../../../models/usuarios/usuario'
import Notification from '../../../models/utils/notificacao'

// Utils
import MESSAGES from '../../../utils/response/messages/messages_pt'
import ErrorType from '../../../utils/response/ErrorType/ErrorType'

// Interface
import IUserRepository from './IUserRepository'

class UserRepositorySequelize extends IUserRepository {
    async createUser(data) {
        return await User.create(data)
    }

    async findByPk(pk) {
        return await User.findByPk(pk)
    }

    async findAll() {
        return await User.findAll()
    }

    async getNotification(data) {
        const notification = await Notification.findOne({
            where: {
                login: data[0],
                idNotificacao: data[1]
            }
        })

        if (notification == null) {
            return {
                error: true,
                message: MESSAGES.NOTIFICATION_NOT_FOUND,
                errorName: ErrorType.NOT_FOUND
            }
        }

        notification.lida = 1
        await notification.save()

        return notification
    }
    
    async getNotifications(user) {
        return await user.getNotificacaos()
    }

    async getUnreadNotifications(user) {
        return await user.getNotificacoesNaoLidas() 
    }
}

export default new UserRepositorySequelize()