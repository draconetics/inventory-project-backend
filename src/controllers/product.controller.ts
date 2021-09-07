import {NextFunction, Request, response, Response } from "express";
import mongoose from 'mongoose';

import { HttpException } from "../common/HttpException";
import { validateParamId } from "./utils/util";
import { IProducts } from "../interfaces/IProducts";
import { IProduct } from "../interfaces/IProduct";
import {Product} from "../models/product";
import { uploadFile, existFile, deleteFile } from "./driveController";

export const getProductList = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
  
        try{
            const products:IProducts = await Product.find({}).populate('brand').sort({ _id : -1});
            let resp = {
                status: 200,
                message: "success",
                data: products
            }
            res.status(200).json(resp);
        }catch(e:any){
            next(new HttpException(e.status, e.message));
        } 
    
    };

  export const createProduct = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
      try{
        //validate(req.body)
        //console.log(req.body);
        const newProduct:IProduct = await new Product(req.body);
        console.log(newProduct);
        const verifyFile = await existFile(newProduct._id);
        if(verifyFile.data && verifyFile.data.files && !verifyFile.data.files.length){
            console.log(verifyFile.data.files);
            const imageId = await uploadFile(req.body.imageBase64, newProduct._id);
            newProduct.imageId = imageId;
            await newProduct.save();
            await newProduct.populate('brand').populate('container').execPopulate();
            res.status(201).json({status:201,message:"success",data:newProduct});
        }else{
            throw new HttpException(500, 'Image of product exist!');
        }
      }catch(e:any){
        next(new HttpException(e.status,e.message));
      }
  };

  

  export const getProductById = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
      try{
        validateParamId(req.params.id);
        let id = mongoose.Types.ObjectId(req.params.id);
        const productFound:IProduct|null = await Product.findOne({_id: id}).populate("brand").populate("container").populate('state');
        if(productFound)
            res.status(200).json({status:200, message:"success", data:productFound});
        else
            next(new HttpException(500,"Product not Found"));
      }catch(e:any){
            next(new HttpException(e.status,e.message));
      }
  };

  export const getProductByCode = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
      try{
        let code = req.params.code;
        let regex = new RegExp(/^\d{5,}$/);
        if(regex.test(code) && !code){
          throw new HttpException(400, 'Id not found as a parameter.')
        }
        const productFound:IProduct|null = await Product.findOne({code: code}).populate("brand").populate("container").populate('state');
        if(productFound)
            res.status(200).json({status:200, message:"success", data:productFound});
        else
            next(new HttpException(500,"Product not Found"));
      }catch(e:any){
            next(new HttpException(e.status,e.message));
      }
  };

  export const updateProduct = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
      try{
        //validate(req.body)
        
        const {_id,cost,gender,brand,imageBase64,container,state} = req.body;
        console.log(_id,cost,gender,brand);
        
        const productFound = await Product.findOneAndUpdate(
          { _id: _id },
          {
            $set: {
              cost,
              gender,
              brand,
              imageId:imageBase64,
              container,
              state
            }
          },
          {
            upsert: true,
            new:true
          }
        ).populate('brand');
        res.status(201).json({status:201,message:"success",data:productFound});
      }catch(e:any){
        next(new HttpException(e.status,e.message));
      }
  };


  export const deleteProductById = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
      try{
        validateParamId(req.params.id)
        let id = mongoose.Types.ObjectId(req.params.id);
        const productFound:IProduct|null = await Product.findByIdAndRemove(id)
        console.log(productFound)
        if(productFound){
          await deleteFile(productFound.imageId+'');
          res.status(200).json({status:200, message:"success", data:productFound});
        }
        else
            next(new HttpException(500,"Not found element to delete"));
      }catch(e:any){
        //console.log("this is the catcher")
        //console.log(e)
        next(new HttpException(e.status,e.message));
      }
  };