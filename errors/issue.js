export class InvalidAssessmentError extends Error {
    constructor(message = 'Invalid assessment') {
        super(message);
        this.name = this.constructor.name;
        Error.captureStackTrace(this, this.constructor);
    }
}