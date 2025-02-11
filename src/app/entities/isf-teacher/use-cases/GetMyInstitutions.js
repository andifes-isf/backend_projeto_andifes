import AuxiliarFunctions from '../../../utils/functions'
import UserTypes from '../../../utils/userType/userTypes'

class GetMyInstitutions {
    async exec(data, IsFTeacherRepository) {
        const authorizationError = AuxiliarFunctions.verifyUserType([UserTypes.ISF_TEACHER, UserTypes.CURSISTA], data.type)

        if (authorizationError) {
            return {
                error: true,
                message: authorizationError.message,
                name: authorizationError.name
            }
        }

        const registrations = await IsFTeacherRepository.findAllDocuments(data.login)

        return {
            error: false,
            data: registrations
        }
    }
}

export default new GetMyInstitutions()