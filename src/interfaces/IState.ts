import {Document} from 'mongoose'
export interface IState extends Document{
    name:String,
    description:String
}