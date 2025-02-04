class GetUsers {
    async exec(userRepository) {
        return await userRepository.findAll()
    } 
}

export default new GetUsers()