"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateParamId = void 0;
const HttpException_1 = require("../../common/HttpException");
const mongoose_1 = __importDefault(require("mongoose"));
const validateParamId = (param) => {
    if (!mongoose_1.default.isValidObjectId(param)) {
        throw new HttpException_1.HttpException(500, 'Param Id is wrong');
    }
};
exports.validateParamId = validateParamId;
