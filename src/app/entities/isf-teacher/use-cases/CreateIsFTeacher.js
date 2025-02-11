import ErrorType from "../../../utils/response/ErrorType/ErrorType"
import MESSAGES from "../../../utils/response/messages/messages_pt"
import UserRepositorySequelize from "../../user/repository/UserRepositorySequelize"
import IsFTeacher from "../IsFTeacher"

class CreateIsFTeacher {
    async exec(data, teacherRepository) {
        const existingTeacher = await teacherRepository.findByPk(data.login)

        if (existingTeacher) {
            const existingTeacherError = {
                message: MESSAGES.EXISTING_ISF_TEACHER,
                errorName: ErrorType.DUPLICATE_ENTRY,
                object: existingTeacher
            }
            
            return {
                error: true,
                existingTeacherError
            }
        }

        const teacher = new IsFTeacher(data)

        const { error, result} = teacher.validateData()

        if (error) {
            console.log(result)
            return {
                error: error,
                result
            }
        }
        
        await UserRepositorySequelize.createUser(teacher)
        const teacherConcrete = await teacherRepository.create(teacher)
        
        return {
            error: error,
            teacherConcrete
        } 
    }
}

export default new CreateIsFTeacher()