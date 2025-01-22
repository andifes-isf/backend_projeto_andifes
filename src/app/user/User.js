// Validation
import EmailDomainValidator from './validators/EmailDomainValidator'
import EthnicityValidator from './validators/EthnicityValidator'
import GenderValidator from './validators/GenderValidator'
import TypeValidator from './validators/TypeValidator'

// Utils
import ValidationError from '../utils/errors/ValidationError'

export default class User {
    constructor ({login, name, surname, DDI, DDD, phone, ethnicity, gender, active = true, email, email_domain, password, type}) {
        this.login = login
        this.name = name
        this.surname = surname
        this.DDI = DDI
        this.DDD = DDD
        this.phone = phone
        this.ethnicity = ethnicity
        this.gender = gender
        this.active = active
        this.email = email
        this.email_domain = email_domain
        this.password = password
        this.type = type

        const validationResult = this.validateData()
        if (!validationResult.valid) {
            throw new Error(validationResult.error)
        }
    }

    validateData() {
        const validator = new EmailDomainValidator(
            new EthnicityValidator(
                new GenderValidator(
                    new TypeValidator()
                )
            )
        )

        return validator.validate({
            login: this.login,
            name: this.name,
            surname: this.surname,
            DDI: this.DDI,
            DDD: this.DDD,
            phone: this.phone,
            ethnicity: this.ethnicity,
            gender: this.gender,
            active: this.active,
            email: this.email,
            email_domain: this.email_domain,
            password: this.password,
            type: this.type
        })
    }
}