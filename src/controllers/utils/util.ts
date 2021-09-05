import { HttpException } from "../../common/HttpException";
import mongoose from 'mongoose';

export const validateParamId = (param:string)=>{
    if(!mongoose.isValidObjectId(param)){
        throw new HttpException(500,'Param Id is wrong');   
    }
}