import ErrorType from "../../../utils/response/ErrorType/ErrorType"
import MESSAGES from "../../../utils/response/messages/messages_pt"

class GetIsFTeacher {
    async exec(data, teacherRepository) {
        const existingProeficiency = await teacherRepository.verifyExistingProeficiency(data.login, data.language, data.level)

        if (existingProeficiency) {
            return {
                error: true,
                message: MESSAGES.EXISTING_PROEFICIENCY + data.language + " " + data.level,
                name: ErrorType.DUPLICATE_ENTRY
            }
        }

        const proeficiency = await teacherRepository.createProeficiency(data.login, data.level, data.language, data.document)

        return {
            error: false,
            data: proeficiency
        }
        
    }
}

export default new GetIsFTeacher()