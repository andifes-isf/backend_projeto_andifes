import Validator from "../../utils/validator"

class EmailDomainValidator extends Validator{
    validate(data) {
        if (0 > data.email_domain || data.email_domain > 3) {
            return {
                valid: false,
                error: "Domínio de email não cadastrado"
            }
        }

        return super.validate(data)
    }
}

export default EmailDomainValidator