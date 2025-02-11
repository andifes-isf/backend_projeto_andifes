class GetIsFTeacher {
    async exec(teacherRepository) {
        return await teacherRepository.findAll()
    }
}

export default new GetIsFTeacher()