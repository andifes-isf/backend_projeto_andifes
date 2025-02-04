class GetMyData {
    async exec(data, userRepository) {
        return await userRepository.findByPk(data)
    }
}

export default new GetMyData()