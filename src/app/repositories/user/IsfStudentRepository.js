import Curso from '../../models/ofertacoletiva/curso'
import TurmaOC from '../../models/ofertacoletiva/turmaoc'

import IsFStudent from "../../models/usuarios/alunoisf"
import IsFStudentProeficiency from '../../models/proeficiencia/proeficienciaalunoisf'

class IsFStudentRepository {
    async create(data) {
        return await IsFStudent.create(data)  
    }

    async findAll() {
        return await AlunoIsF.findAll({
            include: [
                {
                    model: TurmaOC,
                    attributes: {
                        exclude: ['idTurma', 'idCurso', ]
                    },
                    include: {
                        model: Curso,
                        attributes: ['nome']
                    },
                    through: {
                        attributes: []
                    }
                }
            ]
        })
    }

    // PROEFICIENCY
    async findOneProeficiency(data) {
        return await IsFStudentProeficiency.findOne({
            where: {
                login: data.login,
                idioma: data.language,
                nivel: data.level
            }
        })
    }

    async createProeficiency(data) {
        return await IsFStudentProeficiency.create({
            login: data.userLogin,
            nivel: data.level,
            idioma: data.language,
            comprovante: data.document
        })
    }

    async findAllProeficiencyForStudent(login) {
        return await IsFStudentProeficiency.findAll({
            where: {
                login: login
            }
        })
    }
}

export default new IsFStudentRepository()