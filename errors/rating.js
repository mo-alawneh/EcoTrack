export class InvalidRateError extends Error { 
    constructor(message = "Invalid rate") {
        super(message);
        this.name = this.constructor.name;
        Error.captureStackTrace(this, this.constructor);
    }
}