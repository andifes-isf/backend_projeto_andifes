import SpecializationDisciplineClass from '../../models/curso_especializacao/turmadisciplinaespecializacao'


class SpecializationDisciplineClassRepository {
    async findByPk(name) {
        return await SpecializationDisciplineClass.findOne({
            where: {
                nome: name
            }
        })
    }

    async create(data) {
        return await SpecializationDisciplineClass.create(data)
    }
}

export default new SpecializationDisciplineClassRepository()