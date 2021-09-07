"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteClientById = exports.updateClientById = exports.getClientById = exports.createClient = exports.getClientList = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const client_1 = __importDefault(require("../models/client"));
const HttpException_1 = require("../common/HttpException");
const getClientList = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const clientList = yield client_1.default.find({});
        let resp = {
            status: 200,
            message: "success",
            data: clientList
        };
        res.status(200).json(resp);
    }
    catch (e) {
        next(new HttpException_1.HttpException(e.status, e.message));
    }
});
exports.getClientList = getClientList;
const createClient = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newClient = new client_1.default(req.body);
        yield newClient.save();
        res.status(201).json({ status: 201, message: "success", data: newClient });
    }
    catch (e) {
        next(new HttpException_1.HttpException(e.status, e.message));
    }
});
exports.createClient = createClient;
const getClientById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //validateParamId(req.params.id,next)
        let id = mongoose_1.default.Types.ObjectId(req.params.id);
        const clientFound = yield client_1.default.findOne({ _id: id });
        if (clientFound)
            res.status(200).json({ status: 200, message: "success", data: clientFound });
        next(new HttpException_1.HttpException(500, "Client not Found"));
    }
    catch (e) {
        next(new HttpException_1.HttpException(e.status, e.message));
    }
});
exports.getClientById = getClientById;
const updateClientById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //validateParamId(req.params.id,next);
        let id = mongoose_1.default.Types.ObjectId(req.params.id);
        const clientFound = yield client_1.default.findOneAndUpdate({ _id: id }, {
            $set: {
                code: req.body.code,
                name: req.body.name,
                phone: req.body.phone,
                email: req.body.email
            }
        }, {
            upsert: true
        });
        if (clientFound) {
            res.status(200).json({ status: 200, message: "success", data: Object.assign({ _id: id }, req.body) });
        }
        else {
            next(new HttpException_1.HttpException(500, "Client not Found"));
        }
    }
    catch (e) {
        next(new HttpException_1.HttpException(e.status, e.message));
    }
});
exports.updateClientById = updateClientById;
const deleteClientById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //validateParamId(req.params.id,next)
        let id = mongoose_1.default.Types.ObjectId(req.params.id);
        const clientFound = yield client_1.default.findByIdAndRemove(id);
        //console.log(noteFound)
        if (clientFound)
            res.status(200).json({ status: 200, message: "success", data: clientFound });
        else
            next(new HttpException_1.HttpException(500, "Not found element to delete"));
    }
    catch (e) {
        //console.log("this is the catcher")
        //console.log(e)
        next(new HttpException_1.HttpException(e.status, e.message));
    }
});
exports.deleteClientById = deleteClientById;
