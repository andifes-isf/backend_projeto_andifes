import PracticalReport from '../../models/curso_especializacao/relatorio_pratico'


class PracticalReportRepository {
    async findOne(login, name) {
        return await PracticalReport.findOne({
            where: {
                nome: name,
                login: login
            }
        })
    }

    async create(data) {
        return await PracticalReport.create(data)
    }
}

export default new PracticalReportRepository()