import {NextFunction, Request, response, Response } from "express";
import mongoose from 'mongoose';

import {Container} from "../models/container";

import {IContainer} from '../interfaces/IContainer';
import {IContainers} from '../interfaces/IContainers';
import { HttpException } from "../common/HttpException";
import { validateParamId } from "./utils/util";
import { Product } from "../models/product";
import { IProducts } from "../interfaces/IProducts";



export const getContainerList = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
  
        try{
            const containers:IContainers = await Container.find({});
            let resp = {
            status: 200,
            message: "success",
            data: containers
            }
            res.status(200).json(resp);
        }catch(e:any){
            next(new HttpException(e.status, e.message));
        } 
    
    };

  export const createContainer = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
      try{
        const newContainer:IContainer = new Container(req.body);
        await newContainer.save();
        res.status(201).json({status:201,message:"success",data:newContainer});
      }catch(e:any){
        //console.log("this is the catcher")
        //console.log(e)
        next(new HttpException(e.status,e.message));
      }
  };

  export const getContainerById = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
      try{
        validateParamId(req.params.id);
        let id = mongoose.Types.ObjectId(req.params.id);
        const containerFound:IContainer|null = await Container.findOne({_id: id});
        if(containerFound)
            res.status(200).json({status:200, message:"success", data:containerFound});
        else
            next(new HttpException(500,"Container not Found"));
      }catch(e:any){
            next(new HttpException(e.status,e.message));
      }
  };

  export const getAvailableProductById = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
      try{
        validateParamId(req.params.id);
        let id = mongoose.Types.ObjectId(req.params.id);
        const productListFound:IProducts|null = await Product.find({container: id});
        if(productListFound)
            res.status(200).json({status:200, message:"success", data:productListFound});
        else
            next(new HttpException(500,"ProductList not found"));
      }catch(e:any){
            next(new HttpException(e.status,e.message));
      }
  };

  export const updateContainerById = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
      try{
        validateParamId(req.params.id);
        let id = mongoose.Types.ObjectId(req.params.id);
        const containerFound = await Container.findOneAndUpdate(
          { _id: id },
          {
            $set: {
              type: req.body.type,
              space: req.body.space
            }
          },
          {
            upsert: true
          }
        );

        if(containerFound){
          res.status(200).json({status:200, message:"success", data:{_id:id, type: req.body.type, space: req.body.space}});
        }else{
          next(new HttpException(500,"Container not Found"));
        }
      }catch(e:any){
            next(new HttpException(e.status,e.message));
      }
  };



  export const deleteContainerById = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
      try{
        validateParamId(req.params.id);
        let id = mongoose.Types.ObjectId(req.params.id);
        const containerFound:IContainer|null = await Container.findByIdAndRemove(id)
        //console.log(noteFound)
        if(containerFound)
            res.status(200).json({status:200, message:"success", data:containerFound});
        else
            next(new HttpException(500,"Not found element to delete"));
      }catch(e:any){
        //console.log("this is the catcher")
        //console.log(e)
        next(new HttpException(e.status,e.message));
      }
  }; 