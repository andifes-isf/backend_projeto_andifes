class ValidationError extends Error{
    constructor(message) {
        super(message, "ValidationError")

        Error.captureStackTrace(this, this.constructor)
    }
}

export default ValidationError