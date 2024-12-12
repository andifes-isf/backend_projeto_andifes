import SpecializationStudent from '../../models/usuarios/cursistaespecializacao'
import IsFTeacher from '../../models/usuarios/professorisf'
import User from '../../models/usuarios/usuario'

class SpecializationStudentRepository {
    async findByPk(pk) {
        return await SpecializationStudent.findByPk(pk)
    }

    async findAll() {
        return await SpecializationStudent.findAll({
            include: [
                {
                    model: IsFTeacher,
                    attributes: {
                        exclude: ['login'],
                    },
                    include: [{
                        model: User,
                        attributes: {
                            exclude: ['login', 'senha_encriptada', 'ativo']
                        }
                    }]
                }
            ]
        })
    }

    async create(data) {
        return await SpecializationStudent.create(data)
    }

    // Practical Report

    async createPracticalReport(specialization_student, data) {
        return await specialization_student.createMaterial(data)
    }

    async getMaterial(specialization_student, material_name) {
        return await specialization_student.getMaterial({
            where: {
                nome: material_name
            }
        })
    }

    // Advisor
    async getAdvisor(specialization_student) {
        return await specialization_student.getActiveMentorship()
    }

    // Specialition Discipline Class
    async isInClass(specialization_student, class_object) {
        return specialization_student.hasTurma(class_object)
    }

    async addClass(specialization_student, class_object) {
        return specialization_student.addTurma(class_object)
    }

    async getClasses(specialization_student) {
        return specialization_student.getTurma()
    }

    // Guidance Report
    async createGuidanceReport(student, data) {
        return await student.createGuidanceReport({
            workload: data.workload,
            note: data.note || null,
            report_type: 'specialization_student', 
            created_at: new Date().toISOString().split('T')[0]
        })
    }

    async getGuidanceReport(student) {
        return await student.getGuidanceReport()
    }
}

export default new SpecializationStudentRepository()