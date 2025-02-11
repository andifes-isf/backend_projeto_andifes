import MESSAGES from "./response/messages/messages_pt"
import ErrorType from "./response/ErrorType/ErrorType"

class AuxiliarFunctions {
    verifyUserType(userTypes, userType) {
        const founded = userTypes.find((type) => {
            return type == userType
        })

        if (typeof founded === "undefined") {
            return {
                message: MESSAGES.ACCESS_DENIED,
                name: ErrorType.UNAUTHORIZED_ACCESS
            }
        }
    }

    async verifyNonExistingObject(repository, key) {
        const existingObject = await repository.findByPk(key)

        if (existingObject == null) {
            return {
                error: true,
                name: ErrorType.NOT_FOUND
            }
        }

        return existingObject
    }
}

export default new AuxiliarFunctions()