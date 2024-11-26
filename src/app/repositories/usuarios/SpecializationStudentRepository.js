import SpecializationStudent from '../../models/usuarios/cursistaespecializacao'


class SpecializationStudentRepository {
    async findByPk(pk) {
        return await SpecializationStudent.findByPk(pk)
    }

    async create(data) {
        return await SpecializationStudent.create(data)
    }
}

export default new SpecializationStudentRepository()