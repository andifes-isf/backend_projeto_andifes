import Institution from '../../models/instituicao/instituicaoensino'


class PracticalReportRepository {
    async findByPk(id) {
        return await Institution.findByPk(id)
    }

    async save(data) {
        return await data.save()
    }

    async create(data) {
        return await PracticalReport.create(data)
    }
}

export default new PracticalReportRepository()