import Validator from "../../../utils/validator"

class EthnicityValidator extends Validator{
    validate(data) {
        if (0 > data.ethnicity || data.ethnicity > 5) {
            return {
                valid: false,
                error: "Etnia não cadastrada",
                name: "ValidationError"
            }
        }

        return super.validate(data)
    }
}

export default EthnicityValidator