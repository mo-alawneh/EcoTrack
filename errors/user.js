export class InvalidPermissionError extends Error {
    constructor(message = "Invalid permission") {
        super(message);
        this.name = this.constructor.name;
        Error.captureStackTrace(this, this.constructor);
    }
}

export class InvalidCategoryError extends Error {
    constructor(message = "Invalid category") {
        super(message);
        this.name = this.constructor.name;
        Error.captureStackTrace(this, this.constructor);
    }
}

export class AdminCannotBeRemovedError extends Error {
    constructor(message = "Admin cannot be removed") {
        super(message);
        this.name = this.constructor.name;
        Error.captureStackTrace(this, this.constructor);
    }
}

export class WeakPasswordError extends Error { 
    constructor(message = "Weak password") {
        super(message);
        this.name = this.constructor.name;
        Error.captureStackTrace(this, this.constructor);
    }
}