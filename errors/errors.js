export class AdminCannotBeRemovedError extends Error {
    constructor(message = "Admin cannot be removed") {
        super(message);
        this.name = this.constructor.name;
        Error.captureStackTrace(this, this.constructor);
    }
}