import mongoose from "mongoose";
import {IClient} from '../interfaces/IClient';

const clientSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: false,
  },
  email:{
    type: String,
    required: false,
  },
  code:{
    type: String,
    required: false,
  }
},{  timestamps: true });

export = mongoose.model<IClient>("Client", clientSchema);
