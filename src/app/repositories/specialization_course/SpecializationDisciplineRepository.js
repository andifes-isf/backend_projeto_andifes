import SpecializationStudent from '../../models/usuarios/cursistaespecializacao'


class SpecializationStudentRepository {
    async findOne(discipline_name) {
        return await SpecializationStudent.findOne({
            where: {
                nome: discipline_name
            }
        })
    }
}

export default new SpecializationStudentRepository()