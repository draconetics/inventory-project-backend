import {NextFunction, Request, response, Response } from "express";
import mongoose from 'mongoose';

import Client from '../models/client';

import { HttpException } from "../common/HttpException";
import { validateParamId } from "./utils/util";
import { IClients } from "../interfaces/IClients";
import { IClient } from "../interfaces/IClient";



export const getClientList = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
  
        try{
            const clientList:IClients = await Client.find({});
            let resp = {
            status: 200,
            message: "success",
            data: clientList
            }
            res.status(200).json(resp);
        }catch(e:any){
            next(new HttpException(e.status, e.message));
        } 
    
    };
 
  export const createClient = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
      try{
        const newClient:IClient = new Client(req.body);
        await newClient.save();
        res.status(201).json({status:201,message:"success",data:newClient});
      }catch(e:any){
        next(new HttpException(e.status,e.message));
      }
  };

  export const getClientById = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
      try{
        //validateParamId(req.params.id,next)
        let id = mongoose.Types.ObjectId(req.params.id);
        const clientFound:IClient|null = await Client.findOne({_id: id})
        if(clientFound)
            res.status(200).json({status:200, message:"success", data:clientFound});
        next(new HttpException(500,"Client not Found"));
      }catch(e:any){
            next(new HttpException(e.status,e.message));
      }
  };

export const updateClientById = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
      try{
        //validateParamId(req.params.id,next);
        let id = mongoose.Types.ObjectId(req.params.id);
        const clientFound = await Client.findOneAndUpdate(
          { _id: id },
          {
            $set: {
              code: req.body.code,
              name: req.body.name,
              phone: req.body.phone,
              email: req.body.email
            }
          },
          {
            upsert: true
          }
        );

        if(clientFound){
          res.status(200).json({status:200, message:"success", data:{_id:id, ...req.body}});
        }else{
          next(new HttpException(500,"Client not Found"));
        }
      }catch(e:any){
            next(new HttpException(e.status,e.message));
      }
  };



  export const deleteClientById = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
      try{
        //validateParamId(req.params.id,next)
        let id = mongoose.Types.ObjectId(req.params.id);
        const clientFound:IClient|null = await Client.findByIdAndRemove(id)
        //console.log(noteFound)
        if(clientFound)
            res.status(200).json({status:200, message:"success", data:clientFound});
        else
            next(new HttpException(500,"Not found element to delete"));
      }catch(e:any){
        //console.log("this is the catcher")
        //console.log(e)
        next(new HttpException(e.status,e.message));
      }
  };