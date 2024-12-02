import SpecializationDiscipline from '../../models/curso_especializacao/disciplinaespecializacao'


class SpecializationStudentRepository {
    async findOne(discipline_name) {
        return await SpecializationDiscipline.findOne({
            where: {
                nome: discipline_name
            }
        })
    }
}

export default new SpecializationStudentRepository()