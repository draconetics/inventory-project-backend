"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpException = void 0;
class HttpException extends Error {
    constructor(statusCode, message, description) {
        super(message);
        this.status = statusCode;
        this.message = message;
        this.description = description || null;
    }
}
exports.HttpException = HttpException;
