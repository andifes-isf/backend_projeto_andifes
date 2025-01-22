import User from '../../models/usuarios/usuario'
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

    async getNotification(user, id) {
        return await user.getNotificacaos({
            where: {
                idNotificacao: id,
                login: user.login
            }
        })
    }
    
    async getNotifications(user) {
        return await user.getNotificacaos()
    }

    async getUnreadNotifications(user) {
        return await user.getNotificacoesNaoLidas() 
    }
}

export default new UserRepositorySequelize()