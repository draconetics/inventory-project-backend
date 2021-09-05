import mongoose, {Document} from 'mongoose';
import {IClient} from './IClient';
import {IProduct} from './IProduct';

export interface ISale extends Document{
    sale_code:string,
    client:IClient,
    product:IProduct,
    data:Date
}
