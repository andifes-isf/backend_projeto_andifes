import { Sequelize } from "sequelize"
import { Op } from 'sequelize'

import IsFTeacher from '../../models/usuarios/professorisf'
import User from '../../models/usuarios/usuario'
import Institution from '../../models/instituicao/instituicaoensino'
import IsFTeacherProeficiency from '../../models/proeficiencia/proeficienciaprofessorisf'
import IsFTeacherInstitutionDocument from '../../models/usuario_pertence_instituicao/comprovanteprofessorinstituicao'

class IsFTeacherRepository {
    async findByPk(pk) {
        return await IsFTeacher.findByPk(pk)
    }

    async findAll() {
        return await IsFTeacher.findAll({
            include: [
                {
                    model: User,
                    attributes: {
                        include: [
                            [Sequelize.fn('CONCAT_WS', ' ', Sequelize.col('Usuario.name'), Sequelize.col('Usuario.surname')), 'nomeCompleto'],
                            [Sequelize.fn('CONCAT_WS', '@', Sequelize.col('email'), Sequelize.col('email_domain')), 'email']
                        ],
                        exclude: ['login', 'encrypted_password', 'active', 'type', 'surname', 'email_domain', 'email']
                    }
                },
                {
                    model: Institution,
                    attributes: {
                        exclude: ['idInstituicao']
                    },
                    through: {
                        attributes: ['inicio']
                    },
                }
            ],
            logging: console.log
        })
    }
    
    async create(data) {
        return await IsFTeacher.create(data)
    }
    
    // IsF Teacher Proeficiency

    async verifyExistingProeficiency(login, language, level) {
        return await IsFTeacherProeficiency.findOne({
            where: {
                login: login,
                idioma: language,
                nivel: level
            }
        })
    }

    async createProeficiency(login, level, language, document) {
        return await IsFTeacherProeficiency.create({
            login: login,
            nivel: level,
            idioma: language,
            comprovante: document
        })
    }

    async findAllProeficiencies(login) {
        return await  IsFTeacherProeficiency.findAll({
            where: {
                login: login
            }
        })
    }

    // IsF Teahcer Institution
    async joinInstitution(data) {
        return await IsFTeacherInstitutionDocument.create({
            idInstituicao: data.institutionId,
            login: data.login,
            inicio: data.start,
            comprovante: data.document
        })
    }

    async findCurrentDocument(login) {
        return await IsFTeacherInstitutionDocument.findOne({
            where: {
                login: login,
                termino: {
                    [Op.is]: null
                }
            }
        })
    }

    async findAllDocuments(login) {
        return await IsFTeacherInstitutionDocument.findAll({
            where: {
                login: login
            }
        })
    }    

    async findOneDocument(data) {
        return await IsFTeacherInstitutionDocument.findOne({
            where: {
                login: data.login,
                idInstituicao: data.institutionId,
                inicio: data.start
            }
        })
    }

}

export default new IsFTeacherRepository()