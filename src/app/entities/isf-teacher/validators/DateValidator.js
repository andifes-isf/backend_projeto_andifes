import Validator from '../../../utils/validator'

class DateValidator extends Validator {
    validate(data) {
        const today = new Date
        const start = new Date(data.start)
        
        if (start > today) {
            return {
                valid: false,
                error: "Início não pode ser posterior à data de hoje",
                name: "ValidationError"
            }
        }

        return super.validate(data)
    }
}

export default DateValidator