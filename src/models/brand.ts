import mongoose from "mongoose";
import {IBrand} from '../interfaces/IBrand';

const brandSchema = new mongoose.Schema({
  code: {
    type: String,
    required: true,
    
  },
  name: {
    type: String,
    required: true
  },
  tmp:{
    type:Number,
    default:10000
  }
},{  timestamps: true });

brandSchema.pre('save', async function preSave(next) {
    let brand = this as IBrand;
    console.log('pre save')
    try {
      if (brand.isNew) {
        console.log('doc is new')
        //const lastBrand = await Brand.findOne({}, {}, { sort: { 'created_at' : -1 } });
        const lastBrand = await Brand.findOne().sort({ field: 'asc', _id: -1 }).limit(1)
        console.log( lastBrand );
        if(lastBrand){
          brand.tmp = lastBrand.tmp.valueOf() + 1;
        }
      }
      console.log(brand);
      return next();
      
    } catch (error:any) {
        return next(error);
    }
});

export const Brand = mongoose.model<IBrand>("Brand", brandSchema);
