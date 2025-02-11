// User
import User from '../user/User'

// Validation
import DateValidator from './validators/DateValidator'

class IsFTeacher extends User{
    constructor ({ login, poca, start, end, specialization_student, ...user}) {
        
        super({login, ...user})
        this.login = login
        this.poca = poca
        this.start = start
        this.end = end
        this.specialization_student = specialization_student
    }

    validateData() {
        const userResult = super.validateData()
        if (userResult.error) {
            
            const result = {
                error: userResult.validationResult.name,
                message: userResult.validationResult.error
            }

            return {
                error: true,
                result: result
            }
        }

        const validator = new DateValidator()

        const validationResult = validator.validate({
            login: this.login,
            poca: this.poca,
            start: this.start,
            end: this.end,
            specialization_student: this.specialization_student
        })

        if (!validationResult.valid) {
            const result = {
                error: validationResult.error,
                message: validationResult.message
            }

            return {
                error: true,
                result: result
            }
        }

        return {
            error: false
        }
    }
}

export default IsFTeacher