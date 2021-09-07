import {NextFunction, Request, response, Response } from "express";
import mongoose from 'mongoose';

import {State} from "../models/state";

import {IState} from '../interfaces/IState';
import {IStates} from '../interfaces/IStates';
import { HttpException } from "../common/HttpException";
import { validate } from "./utils/brand.util";
import { validateParamId } from "./utils/util";

export const getStateList = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
  
        try{
            const states:IStates = await State.find({});
            let resp = {
            status: 200,
            message: "success",
            data: states
            }
            res.status(200).json(resp);
        }catch(e:any){
            next(new HttpException(e.status, e.message));
        } 
    
    };

  export const createState = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
      try{
        const newState:IState = new State(req.body);
        await newState.save();
        res.status(201).json({status:201,message:"success",data:newState});
      }catch(e:any){
        //console.log("this is the catcher")
        //console.log(e)
        next(new HttpException(e.status,e.message));
      }
  };

  export const getStateById = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
      try{
        validateParamId(req.params.id);
        let id = mongoose.Types.ObjectId(req.params.id);
        const stateFound:IState|null = await State.findOne({_id: id})
        if(stateFound)
            res.status(200).json({status:200, message:"success", data:stateFound});
        else
            next(new HttpException(500,"State not Found"));
      }catch(e:any){
            next(new HttpException(e.status,e.message));
      }
  };

  export const updateStateById = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
      try{
        validateParamId(req.params.id);
        let id = mongoose.Types.ObjectId(req.params.id);
        const stateFound = await State.findOneAndUpdate(
          { _id: id },
          {
            $set: {
              description: req.body.description,
              name: req.body.name
            }
          },
          {
            upsert: true
          }
        );
        if(stateFound){
          res.status(200).json({status:200, message:"success", data:{_id:id, description: req.body.description, name: req.body.name}});
        }else{
          next(new HttpException(500,"State not Found"));
        }
      }catch(e:any){
            next(new HttpException(e.status,e.message));
      }
  };



  export const deleteStateById = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
      try{
        validateParamId(req.params.id);
        let id = mongoose.Types.ObjectId(req.params.id);
        const stateFound:IState|null = await State.findByIdAndRemove(id)
        //console.log(noteFound)
        if(stateFound)
            res.status(200).json({status:200, message:"success", data:stateFound});
        else
            next(new HttpException(500,"Not found element to delete"));
      }catch(e:any){
        //console.log("this is the catcher")
        //console.log(e)
        next(new HttpException(e.status,e.message));
      }
  }; 