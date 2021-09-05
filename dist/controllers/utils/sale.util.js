"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validate = void 0;
const HttpException_1 = require("../../common/HttpException");
const validate = (body) => {
    let message = '';
    const products = body.products;
    if (products && !products.length)
        message = "Array of products is required";
    if (message.length > 0)
        throw new HttpException_1.HttpException(422, message);
};
exports.validate = validate;
