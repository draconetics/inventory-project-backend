import {Document} from 'mongoose'
export interface IContainer extends Document{
    type:String,
    space:String,
}