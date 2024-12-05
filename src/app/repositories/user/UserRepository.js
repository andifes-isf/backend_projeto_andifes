import User from '../../models/usuarios/usuario'


class UserRepository {
    async findByPk(pk) {
        return await User.findByPk(pk)
    }

    async create(data) {
        return await User.create(data)
    }
}

export default new UserRepository()