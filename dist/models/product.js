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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Product = void 0;
const mongoose = require("mongoose");
const productSchema = new mongoose.Schema({
    code: {
        type: Number,
        default: 10000
    },
    imageId: String,
    gender: String,
    cost: Number,
    brand: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Brand"
    }
}, { timestamps: true });
productSchema.pre('save', function preSaveProduct(next) {
    return __awaiter(this, void 0, void 0, function* () {
        let product = this;
        console.log('pre save');
        try {
            if (product.isNew) {
                console.log('doc is new');
                //const lastProduct = await Brand.findOne({}, {}, { sort: { 'created_at' : -1 } });
                const lastProduct = yield exports.Product.findOne().sort({ field: 'asc', _id: -1 }).limit(1);
                console.log(lastProduct);
                if (lastProduct) {
                    product.code = lastProduct.code.valueOf() + 1;
                }
            }
            console.log(product);
            return next();
        }
        catch (error) {
            return next(error);
        }
    });
});
exports.Product = mongoose.model("Product", productSchema);
