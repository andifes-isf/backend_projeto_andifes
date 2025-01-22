import User from '../User'

class CreateUser {
    constructor(userRepository) {
        this.userRepository = userRepository
    }

    async exec(data) {
        console.log("Entrou \n\n")
        const user = new User(data)

        user.validateData()

        return await this.UserRepositorySequelize.CreateUser(user)
    }
}

export default CreateUser