import Validator from "../../utils/validator"

class GenderValidator extends Validator{
    validate(data) {
        if (0 > data.gender || data.gender > 3) {
            return {
                valid: false,
                error: "Gênero não cadastrado"
            }
        }

        return super.validate(data)
    }
}

export default GenderValidator