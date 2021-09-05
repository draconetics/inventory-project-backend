import {NextFunction, Request, response, Response } from "express";
import Mongoose from "mongoose";

import { HttpException } from "../common/HttpException";
import Sale from '../models/sale';
import { ISale } from '../interfaces/ISale';
import { ISales } from '../interfaces/ISales';
import { validate } from './utils/sale.util';
import { validateParamId } from "./utils/util";

export const getSaleList = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
  
        try{
            const sales:ISales = await Sale.find({})
                .populate('client')
                .populate({
                  path: 'product',
                  model: 'Product',
                  populate: {
                      path: 'brand',
                      model: 'Brand',
                  }
                });
            let resp = {
                status: 200,
                message: "success",
                data: sales
            }
            res.status(200).json(resp);
        }catch(e:any){
            next(new HttpException(e.status, e.message));
        } 
    
    };

export const createSale = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
      try{
        const newSale:ISale = new Sale(req.body);
        await newSale.save();
        const saleFound:ISale|null = await Sale.findOne({_id: newSale._id})
            .populate('client')
            .populate({
              path: 'product',
              model: 'Product',
              populate: {
                  path: 'brand',
                  model: 'Brand',
              }
            });
        if(saleFound)
            res.status(200).json({status:200, message:"success", data:saleFound});
        else
            next(new HttpException(500,"Internal error - Sale not Found"));
        res.status(201).json({status:201,message:"success",data:newSale});
      }catch(e:any){
        next(new HttpException(e.status,e.message));
      }
  };

  export const getSaleById = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
      try{
        //validateParamId(req.params.id,next)
        let id = Mongoose.Types.ObjectId(req.params.id);
        console.log('this is the id');
        console.log(id);
        const saleFound:ISale|null = await Sale.findOne({_id: id})
            .populate('client')
            .populate({
              path: 'product',
              model: 'Product',
              populate: {
                  path: 'brand',
                  model: 'Brand',
              }
            });
        if(saleFound)
            res.status(200).json({status:200, message:"success", data:saleFound});
        else
            next(new HttpException(500,"Sale not Found"));
      }catch(e:any){
            next(new HttpException(e.status,e.message));
      }
  };

export const updateSale = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
      try{
        let saleId = Mongoose.Types.ObjectId(req.body._id);
        
        const saleFound = await Sale.findOneAndUpdate(
          { _id: saleId },
          {
            $set: {
              sale_code: req.body.sale_code,
              client: req.body.client,
              product: req.body.product,
              date: req.body.date
            }
          },
          {
            upsert: true
          }
        ).populate('client')
        .populate({
          path: 'product',
          model: 'Product',
          populate: {
              path: 'brand',
              model: 'Brand',
          }
        });

        if(saleFound){
          res.status(200).json({status:200, message:"success", data:{...req.body}});
        }else{
          next(new HttpException(500,"Sale not Found"));
        }
      }catch(e:any){
            next(new HttpException(e.status,e.message));
      }
  };



  export const deleteSaleById = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
      try{
        //validateParamId(req.params.id,next)
        let id = Mongoose.Types.ObjectId(req.params.id);
        const saleFound:ISale|null = await Sale.findByIdAndRemove(id)
            .populate('client')
            .populate({
              path: 'product',
              model: 'Product',
              populate: {
                  path: 'brand',
                  model: 'Brand',
              }
            });
        
        if(saleFound)
            res.status(200).json({status:200, message:"success", data:saleFound});
        else
            next(new HttpException(500,"Not found element to delete"));
      }catch(e:any){
        next(new HttpException(e.status,e.message));
      }
  };