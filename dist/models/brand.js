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
exports.Brand = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const brandSchema = new mongoose_1.default.Schema({
    code: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true
    },
    tmp: {
        type: Number,
        default: 10000
    }
}, { timestamps: true });
brandSchema.pre('save', function preSave(next) {
    return __awaiter(this, void 0, void 0, function* () {
        let brand = this;
        console.log('pre save');
        try {
            if (brand.isNew) {
                console.log('doc is new');
                //const lastBrand = await Brand.findOne({}, {}, { sort: { 'created_at' : -1 } });
                const lastBrand = yield exports.Brand.findOne().sort({ field: 'asc', _id: -1 }).limit(1);
                console.log(lastBrand);
                if (lastBrand) {
                    brand.tmp = lastBrand.tmp.valueOf() + 1;
                }
            }
            console.log(brand);
            return next();
        }
        catch (error) {
            return next(error);
        }
    });
});
exports.Brand = mongoose_1.default.model("Brand", brandSchema);
