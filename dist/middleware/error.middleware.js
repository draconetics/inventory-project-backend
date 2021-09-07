"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const errorHandler = (error, request, response, next) => {
    console.log('error.middleware');
    console.log(error);
    if (error !== null) {
        //console.log(error);
        const status = error.status || 500;
        const message = error.message || "It's not you. It's us. We are having some problems.";
        const description = error.description || "";
        return response.status(status).send({ status, message, description });
    }
    return next();
};
exports.errorHandler = errorHandler;
