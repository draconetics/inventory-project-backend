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
exports.deleteBrandById = exports.updateBrandById = exports.getBrandById = exports.createBrand = exports.getBrandList = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const brand_1 = require("../models/brand");
const HttpException_1 = require("../common/HttpException");
const brand_util_1 = require("./utils/brand.util");
const util_1 = require("./utils/util");
const getBrandList = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const brands = yield brand_1.Brand.find({});
        let resp = {
            status: 200,
            message: "success",
            data: brands
        };
        res.status(200).json(resp);
    }
    catch (e) {
        next(new HttpException_1.HttpException(e.status, e.message));
    }
});
exports.getBrandList = getBrandList;
const createBrand = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        (0, brand_util_1.validate)(req.body);
        const newBrand = new brand_1.Brand(req.body);
        yield newBrand.save();
        res.status(201).json({ status: 201, message: "success", data: newBrand });
    }
    catch (e) {
        //console.log("this is the catcher")
        //console.log(e)
        next(new HttpException_1.HttpException(e.status, e.message));
    }
});
exports.createBrand = createBrand;
const getBrandById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        (0, util_1.validateParamId)(req.params.id);
        let id = mongoose_1.default.Types.ObjectId(req.params.id);
        const brandFound = yield brand_1.Brand.findOne({ _id: id });
        if (brandFound)
            res.status(200).json({ status: 200, message: "success", data: brandFound });
        next(new HttpException_1.HttpException(500, "Brand not Found"));
    }
    catch (e) {
        next(new HttpException_1.HttpException(e.status, e.message));
    }
});
exports.getBrandById = getBrandById;
const updateBrandById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        (0, util_1.validateParamId)(req.params.id);
        (0, brand_util_1.validate)(req.body);
        let id = mongoose_1.default.Types.ObjectId(req.params.id);
        const brandFound = yield brand_1.Brand.findOneAndUpdate({ _id: id }, {
            $set: {
                code: req.body.code,
                name: req.body.name
            }
        }, {
            upsert: true
        });
        if (brandFound) {
            res.status(200).json({ status: 200, message: "success", data: { _id: id, code: req.body.code, name: req.body.name } });
        }
        else {
            next(new HttpException_1.HttpException(500, "Brand not Found"));
        }
    }
    catch (e) {
        next(new HttpException_1.HttpException(e.status, e.message));
    }
});
exports.updateBrandById = updateBrandById;
const deleteBrandById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        (0, util_1.validateParamId)(req.params.id);
        let id = mongoose_1.default.Types.ObjectId(req.params.id);
        const brandFound = yield brand_1.Brand.findByIdAndRemove(id);
        //console.log(noteFound)
        if (brandFound)
            res.status(200).json({ status: 200, message: "success", data: brandFound });
        else
            next(new HttpException_1.HttpException(500, "Not found element to delete"));
    }
    catch (e) {
        //console.log("this is the catcher")
        //console.log(e)
        next(new HttpException_1.HttpException(e.status, e.message));
    }
});
exports.deleteBrandById = deleteBrandById;
