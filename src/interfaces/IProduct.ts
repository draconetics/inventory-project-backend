import mongoose, {Document, ObjectId} from 'mongoose'

export interface IProduct extends Document{
    code?: Number,
    imageId: String,
    gender: String,
    cost: Number,
    brand: IBrand['_id'],
    imageBase64?:string,
}
