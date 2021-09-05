import mongoose, {Document, ObjectId} from 'mongoose';
import {IBrand} from './IBrand';

export interface IProduct extends Document{
    code?: Number,
    imageId: String,
    gender: String,
    cost: Number,
    brand: IBrand['_id'],
    imageBase64?:string,
}
