

class CustomAPIError extends Error{
    constructor(message,statusCode) {
        super(message)
        this.statusCode = statusCode
    }
}

class BadRequestError extends CustomAPIError {
    constructor(message) {
        super(message);
        this.statusCode = 400;
    }
}

class NotFoundError extends CustomAPIError {
    constructor(message) {
        super(message);
        this.statusCode = 404;
    }
}

class UnauthorizedError extends CustomAPIError {
    constructor(message) {
        super(message);
        this.statusCode = 401;
    }
}

module.exports = {UnauthorizedError,BadRequestError,NotFoundError,CustomAPIError}