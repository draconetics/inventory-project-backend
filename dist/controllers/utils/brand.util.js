"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validate = void 0;
const HttpException_1 = require("../../common/HttpException");
const validate = (body) => {
    let message = "";
    let codeIsUndefined = body.code === undefined;
    let codeIsEmpty = body.code === "";
    let nameIsUndefined = body.name === undefined;
    let nameIsEmpty = body.name === "";
    if (codeIsUndefined || typeof body.code !== "string")
        message = "Code is not type string and it is required";
    else if (codeIsEmpty)
        message = "Code is empty";
    if (nameIsUndefined || typeof body.name !== "string")
        message = "Name is not type string and it is required";
    else if (nameIsEmpty)
        message = "Name is empty";
    if (message.length > 0)
        throw new HttpException_1.HttpException(422, message);
};
exports.validate = validate;
