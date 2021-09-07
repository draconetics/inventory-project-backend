import mongoose, {Document, ObjectId} from 'mongoose';
import {IBrand} from './IBrand';
import { IContainer } from './IContainer';
import { IState } from './IState';

export interface IProduct extends Document{
    code?: Number,
    imageId: String,
    gender: String,
    cost: Number,
    brand: IBrand['_id'],
    container?: IContainer['_id'],
    state?: IState['_id'],
    imageBase64?:string,
}
