import AdvisorTeacher from '../../models/usuarios/docenteorientador'
import User from '../../models/usuarios/usuario'
import Mentorship from '../../models/curso_especializacao/OrientadorOrientaCursista'

// Utils
import Op from 'sequelize'

class AdvisorTeacherRepository {
    async findByPk(pk) {
        return await AdvisorTeacher.findByPk(pk)
    }

    async create(login) {
        return await AdvisorTeacher.create({
            login: login
        })
    }

    async findAll() {
        return await AdvisorTeacher.findAll({
            include: [
                {
                    model: User,
                    attributes: {
                        exclude: ['login', 'senha_encriptada', 'ativo']
                    }
                }
            ]
        })
    }

    // Mentorship

    async verifyExistingMentorship(advisor, mentee) {
        return await advisor.hasMentee(mentee)
    }

    async createMentorship(advisor_login, mentee) {
        const relation =  await Mentorship.create({
            loginCursista: mentee.login,
            loginOrientador: advisor_login,
            inicio: new Date().toISOString().split("T")[0]
        })

        mentee.has_mentor = true
        mentee.save()

        return relation
    }

    async getMentorship(advisor_login ,mentee_login) {
        const relation = await Mentorship.findOne({
            where: {
                loginOrientador: advisor_login,
                loginCursista: mentee_login,
                status: 'ativo'
            }
        })

        return relation
    }

    async deleteMentorship(relation) {
        await relation.destroy()
        return relation
    }

    // Mentorship Practical Reports
    async getMaterialsToAnalisys(advisor) {
        return await advisor.getMaterialsToAnalysis()
    }

    async getNotViewedPracticalReports(advisor) {
        return await advisor.getMaterialsToAnalysis({
            where: {
                data_avaliacao: null
            }
        })
    }

    async getNotValidatedPracticalReports(advisor) {
        return await advisor.getMaterialsToAnalysis({
            where: {
                data_avaliacao: {
                    [Op.ne]: null
                },
                validado: false
            }
        })
    }

    async savePracticalReport(report) {
        return await report.save()
    }
}

export default new AdvisorTeacherRepository