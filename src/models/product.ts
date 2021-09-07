const mongoose = require("mongoose");
import {IProduct} from '../interfaces/IProduct';

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
      },
    container: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Container"
    },
    state: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "State"
    },
  },{  timestamps: true });
  

productSchema.pre('save', async function preSaveProduct(this:any,next:any) {
    let product:any = this as IProduct;
    console.log('pre save')
    try {
      if (product.isNew) {
        console.log('doc is new')
        //const lastProduct = await Brand.findOne({}, {}, { sort: { 'created_at' : -1 } });
        const lastProduct = await Product.findOne().sort({ field: 'asc', _id: -1 }).limit(1)
        console.log( lastProduct );
        if(lastProduct){
          product.code = lastProduct.code.valueOf() + 1;
        }
      }
      console.log(product);
      return next();
      
    } catch (error) {
        return next(error);
    }
});


  
export const Product = mongoose.model("Product", productSchema);
