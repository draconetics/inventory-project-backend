import mongoose from "mongoose";
import {IContainer} from '../interfaces/IContainer';

const containerSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
  },
  space: {
    type: String,
    required: true
  }
},{  timestamps: true });

export const Container = mongoose.model<IContainer>("Container", containerSchema);
