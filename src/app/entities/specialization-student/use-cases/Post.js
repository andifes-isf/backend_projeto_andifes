import SpecializationStudent from "../SpecializationStudent"

import ErrorType from "../../../utils/response/ErrorType/ErrorType"
import MESSAGES from "../../../utils/response/messages/messages_pt"
import IsFTeacherRepository from "../../isf-teacher/repository/IsFTeacherRepository"
import UserRepositorySequelize from "../../user/repository/UserRepositorySequelize"


class Post {
    async exec(data, specializationStudentRepository) {
        const existingSpecializationStudent = await specializationStudentRepository.findByPk(data.login)
        
        if (existingSpecializationStudent) {
            const existingStudentError = {
                message: MESSAGES.EXISTING_SPECIALIZATION_STUDENT,
                errorName: ErrorType.DUPLICATE_ENTRY,
                object: existingSpecializationStudent
            }
            console.log("ESS ", existingStudentError)
            return {
                error: true,
                result: existingStudentError
            }
        }

        const specializationStudent = new SpecializationStudent(data)
        
        const { error, result } = specializationStudent.validateData()

        if (error) {
            return {
                error: error,
                result
            }
        }

        console.log("TESTEafas")
        await UserRepositorySequelize.createUser(specializationStudent)
        await IsFTeacherRepository.create(specializationStudent)
        const studentConcrete = await specializationStudentRepository.create(specializationStudent)

        return {
            error: error,
            result: studentConcrete
        }

        
    }
}

export default new Post()