import IsFTeacher from '../../models/usuarios/professorisf'


class IsFTeacherRepository {
    async findByPk(pk) {
        return await IsFTeacher.findByPk(pk)
    }

    async create(data) {
        return await IsFTeacher.create(data)
    }
}

export default new IsFTeacherRepository()