export class InvalidSourceError extends Error { 
    constructor(message = 'Invalid source!') {
        super(message);
        this.name = this.constructor.name;
        Error.captureStackTrace(this, this.constructor);
    }
}