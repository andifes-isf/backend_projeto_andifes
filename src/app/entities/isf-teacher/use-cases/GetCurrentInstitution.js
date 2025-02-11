import AuxiliarFunctions from '../../../utils/functions'
import UserTypes from '../../../utils/userType/userTypes'

class GetCurrentInstitution {
    async exec(data, IsFTeacherRepository) {
        const authorizationError = AuxiliarFunctions.verifyUserType([UserTypes.ISF_TEACHER, UserTypes.CURSISTA], data.type)

        if (authorizationError) {
            return {
                error: true,
                message: authorizationError.message,
                errorName: authorizationError.name
            }
        }

        const registration = await IsFTeacherRepository.findCurrentDocument(data.login)

        return {
            error: false,
            data: registration
        }
    }
}

export default new GetCurrentInstitution()