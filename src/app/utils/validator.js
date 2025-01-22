class Validator {
    constructor(next = null) {
        this.next = next
    }

    validate(data) {
        if (this.next) {
            return this.next.validate(data)
        }

        return {valid: true}
    }
}

export default Validator