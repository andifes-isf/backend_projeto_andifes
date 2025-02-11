import AuxiliarFunctions from '../../../utils/functions'
import UserTypes from '../../../utils/userType/userTypes'
import MESSAGES from '../../../utils/response/messages/messages_pt'
import ErrorType from '../../../utils/response/ErrorType/ErrorType'

class PostInstituicao {
    static async closeRegistration(login, IsFTeacherRepository, InstitutionRepository) {
        const registration = await IsFTeacherRepository.findCurrentDocument(login)

        if (registration != null) {
            registration.termino = new Date().toISOString().split("T")[0]
            InstitutionRepository.save(registration)
        }
    }

    static async verifyExistingRegistration(data, IsFTeacherRepository) {
        const existingRegistrantion = await IsFTeacherRepository.findOneDocument(data)

        if(existingRegistrantion) {
            return {
                message: MESSAGES.EXISTING_INSTITUTION_USER_RELATIONSHIP + data.institutionId,
                name: ErrorType.DUPLICATE_ENTRY
            }
        }
    }

    async exec(data, IsFTeacherRepository, InstitutionRepository) {
        const authorizationError = AuxiliarFunctions.verifyUserType([UserTypes.ISF_TEACHER, UserTypes.CURSISTA], data.type)

        if (authorizationError) {
            return {
                error: true,
                message: authorizationError.message,
                name: authorizationError.name
            }
        }
        
        const nonExistingInstitution = await AuxiliarFunctions.verifyNonExistingObject(InstitutionRepository, data.institutionId)
        if(nonExistingInstitution.error) {
            return {
                error: true,
                message: MESSAGES.INSTITUTION_NOT_FOUND + data.institutionId,
                name: nonExistingInstitution.name
            }
        }

        const existingRegistration = await PostInstituicao.verifyExistingRegistration(data, IsFTeacherRepository)
        
        if (existingRegistration) {
            return {
                error: true,
                message: existingRegistration.message,
                name: existingRegistration.name
            }
        }
        
        await PostInstituicao.closeRegistration(data.login, IsFTeacherRepository, InstitutionRepository)
        const registration = await IsFTeacherRepository.joinInstitution(data)

        return {
            error: false,
            data: registration
        }
    }
}

export default new PostInstituicao()