import mongoose from "mongoose";
import {IState} from '../interfaces/IState';

const stateSchema = new mongoose.Schema({
  
  name: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
},{  timestamps: true });


export const State = mongoose.model<IState>("State", stateSchema);
