import AuxiliarFunctions from '../../../utils/functions'
import UserTypes from '../../../utils/userType/userTypes'

class GetMyProeficiency {
    async exec(data, teacherRepository) {
        const authorizationError = AuxiliarFunctions.verifyUserType([UserTypes.ISF_TEACHER, UserTypes.CURSISTA], data.type)

        if (authorizationError) {
            return {
                error: true,
                message: authorizationError.message,
                name: authorizationError.name
            }
        }
        const myProeficienies = await teacherRepository.findAllProeficiencies(data.login)        

        return {
            error: false,
            data: myProeficienies
        }
    }
}

export default new GetMyProeficiency()