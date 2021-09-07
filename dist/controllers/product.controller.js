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
exports.deleteProductById = exports.updateProduct = exports.getProductByCode = exports.getProductById = exports.createProduct = exports.getProductList = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const HttpException_1 = require("../common/HttpException");
const util_1 = require("./utils/util");
const product_1 = require("../models/product");
const driveController_1 = require("./driveController");
const getProductList = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const products = yield product_1.Product.find({}).populate('brand');
        let resp = {
            status: 200,
            message: "success",
            data: products
        };
        res.status(200).json(resp);
    }
    catch (e) {
        next(new HttpException_1.HttpException(e.status, e.message));
    }
});
exports.getProductList = getProductList;
const createProduct = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //validate(req.body)
        //console.log(req.body);
        const newProduct = yield new product_1.Product(req.body);
        console.log(newProduct);
        const verifyFile = yield (0, driveController_1.existFile)(newProduct._id);
        if (verifyFile.data && verifyFile.data.files && !verifyFile.data.files.length) {
            console.log(verifyFile.data.files);
            const imageId = yield (0, driveController_1.uploadFile)(req.body.imageBase64, newProduct._id);
            newProduct.imageId = imageId;
            yield newProduct.save();
            yield newProduct.populate('brand').execPopulate();
            res.status(201).json({ status: 201, message: "success", data: newProduct });
        }
        else {
            throw new HttpException_1.HttpException(500, 'Image of product exist!');
        }
    }
    catch (e) {
        next(new HttpException_1.HttpException(e.status, e.message));
    }
});
exports.createProduct = createProduct;
const getProductById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        (0, util_1.validateParamId)(req.params.id);
        let id = mongoose_1.default.Types.ObjectId(req.params.id);
        const productFound = yield product_1.Product.findOne({ _id: id }).populate("brand");
        if (productFound)
            res.status(200).json({ status: 200, message: "success", data: productFound });
        else
            next(new HttpException_1.HttpException(500, "Product not Found"));
    }
    catch (e) {
        next(new HttpException_1.HttpException(e.status, e.message));
    }
});
exports.getProductById = getProductById;
const getProductByCode = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let code = req.params.code;
        let regex = new RegExp(/^\d{5,}$/);
        if (regex.test(code) && !code) {
            throw new HttpException_1.HttpException(400, 'Id not found as a parameter.');
        }
        const productFound = yield product_1.Product.findOne({ code: code }).populate("brand");
        if (productFound)
            res.status(200).json({ status: 200, message: "success", data: productFound });
        else
            next(new HttpException_1.HttpException(500, "Product not Found"));
    }
    catch (e) {
        next(new HttpException_1.HttpException(e.status, e.message));
    }
});
exports.getProductByCode = getProductByCode;
const updateProduct = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //validate(req.body)
        const { _id, cost, gender, brand, imageBase64 } = req.body;
        console.log(_id, cost, gender, brand);
        let imageId = imageBase64.split('=')[2];
        if (imageBase64.includes('base64')) {
            yield (0, driveController_1.deleteFile)(_id);
            const newImageId = yield (0, driveController_1.uploadFile)(imageBase64, _id);
            imageId = newImageId;
        }
        const productFound = yield product_1.Product.findOneAndUpdate({ _id: _id }, {
            $set: {
                cost,
                gender,
                brand: brand._id,
                imageId: imageId
            }
        }, {
            upsert: true,
            new: true
        }).populate('brand');
        res.status(201).json({ status: 201, message: "success", data: productFound });
    }
    catch (e) {
        next(new HttpException_1.HttpException(e.status, e.message));
    }
});
exports.updateProduct = updateProduct;
const deleteProductById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        (0, util_1.validateParamId)(req.params.id);
        let id = mongoose_1.default.Types.ObjectId(req.params.id);
        yield (0, driveController_1.deleteFile)(req.params.id);
        const productFound = yield product_1.Product.findByIdAndRemove(id);
        console.log(productFound);
        if (productFound)
            res.status(200).json({ status: 200, message: "success", data: productFound });
        else
            next(new HttpException_1.HttpException(500, "Not found element to delete"));
    }
    catch (e) {
        //console.log("this is the catcher")
        //console.log(e)
        next(new HttpException_1.HttpException(e.status, e.message));
    }
});
exports.deleteProductById = deleteProductById;
