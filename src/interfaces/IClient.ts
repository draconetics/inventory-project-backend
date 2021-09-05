import {Document} from 'mongoose';

export interface IClient extends Document{
    code:String,
    name:String,
    phone:String,
    email:String
}