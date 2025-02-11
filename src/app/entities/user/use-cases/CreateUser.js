import User from '../User'

class CreateUser {
    async exec(data, userRepository) {
        const user = new User(data)

        const {error, validationResult: result} = user.validateData()
        
        if (error) {
            return {
                error: error,
                result
            }
        }

        const userConcrete = await userRepository.createUser(user)

        return {
            error: error,
            userConcrete
        }
    }
}

export default new CreateUser()