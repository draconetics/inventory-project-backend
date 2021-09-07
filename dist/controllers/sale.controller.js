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
exports.deleteSaleById = exports.updateSale = exports.getSaleById = exports.createSale = exports.getSaleList = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const HttpException_1 = require("../common/HttpException");
const sale_1 = __importDefault(require("../models/sale"));
const getSaleList = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const sales = yield sale_1.default.find({})
            .populate('client')
            .populate({
            path: 'product',
            model: 'Product',
            populate: {
                path: 'brand',
                model: 'Brand',
            }
        });
        let resp = {
            status: 200,
            message: "success",
            data: sales
        };
        res.status(200).json(resp);
    }
    catch (e) {
        next(new HttpException_1.HttpException(e.status, e.message));
    }
});
exports.getSaleList = getSaleList;
const createSale = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newSale = new sale_1.default(req.body);
        yield newSale.save();
        const saleFound = yield sale_1.default.findOne({ _id: newSale._id })
            .populate('client')
            .populate({
            path: 'product',
            model: 'Product',
            populate: {
                path: 'brand',
                model: 'Brand',
            }
        });
        if (saleFound)
            res.status(200).json({ status: 200, message: "success", data: saleFound });
        else
            next(new HttpException_1.HttpException(500, "Internal error - Sale not Found"));
        res.status(201).json({ status: 201, message: "success", data: newSale });
    }
    catch (e) {
        next(new HttpException_1.HttpException(e.status, e.message));
    }
});
exports.createSale = createSale;
const getSaleById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //validateParamId(req.params.id,next)
        let id = mongoose_1.default.Types.ObjectId(req.params.id);
        console.log('this is the id');
        console.log(id);
        const saleFound = yield sale_1.default.findOne({ _id: id })
            .populate('client')
            .populate({
            path: 'product',
            model: 'Product',
            populate: {
                path: 'brand',
                model: 'Brand',
            }
        });
        if (saleFound)
            res.status(200).json({ status: 200, message: "success", data: saleFound });
        else
            next(new HttpException_1.HttpException(500, "Sale not Found"));
    }
    catch (e) {
        next(new HttpException_1.HttpException(e.status, e.message));
    }
});
exports.getSaleById = getSaleById;
const updateSale = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let saleId = mongoose_1.default.Types.ObjectId(req.body._id);
        const saleFound = yield sale_1.default.findOneAndUpdate({ _id: saleId }, {
            $set: {
                sale_code: req.body.sale_code,
                client: req.body.client,
                product: req.body.product,
                date: req.body.date
            }
        }, {
            upsert: true
        }).populate('client')
            .populate({
            path: 'product',
            model: 'Product',
            populate: {
                path: 'brand',
                model: 'Brand',
            }
        });
        if (saleFound) {
            res.status(200).json({ status: 200, message: "success", data: Object.assign({}, req.body) });
        }
        else {
            next(new HttpException_1.HttpException(500, "Sale not Found"));
        }
    }
    catch (e) {
        next(new HttpException_1.HttpException(e.status, e.message));
    }
});
exports.updateSale = updateSale;
const deleteSaleById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //validateParamId(req.params.id,next)
        let id = mongoose_1.default.Types.ObjectId(req.params.id);
        const saleFound = yield sale_1.default.findByIdAndRemove(id)
            .populate('client')
            .populate({
            path: 'product',
            model: 'Product',
            populate: {
                path: 'brand',
                model: 'Brand',
            }
        });
        if (saleFound)
            res.status(200).json({ status: 200, message: "success", data: saleFound });
        else
            next(new HttpException_1.HttpException(500, "Not found element to delete"));
    }
    catch (e) {
        next(new HttpException_1.HttpException(e.status, e.message));
    }
});
exports.deleteSaleById = deleteSaleById;
