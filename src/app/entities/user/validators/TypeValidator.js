import Validator from "../../../utils/validator"

class TypeValidator extends Validator{
    validate(data) {
        if (0 > data.type || data.type > 6) {
            return {
                valid: false,
                error: "Tipo de usuário não cadastrado",
                name: "ValidationError"
            }
        }

        return super.validate(data)
    }
}

export default TypeValidator