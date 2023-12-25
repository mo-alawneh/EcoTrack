export class InvalidOverallCategory extends Error {
    constructor(message = 'Invalid overall category!') {
        super(message);
        this.name = this.constructor.name;
        Error.captureStackTrace(this, this.constructor);
    }
}

export class AddedToDirtyTypeError extends Error { 
    constructor(message = 'You cannot add to a dirty type!') {
        super(message);
        this.name = this.constructor.name;
        Error.captureStackTrace(this, this.constructor);
    }
}

export class SimilarTypeWasAlreadyAddedError extends Error { 
    constructor(message = 'A similar type was already added!') {
        super(message);
        this.name = this.constructor.name;
        Error.captureStackTrace(this, this.constructor);
    }
}