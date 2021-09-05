import {HttpException} from "../common/HttpException";
import { Request, Response, NextFunction } from "express";

export const errorHandler = (
  error: HttpException,
  request: Request,
  response: Response,
  next: NextFunction
) => {
    console.log('error.middleware');
    console.log(error);
  if(error !== null){
    
    //console.log(error);
    const status = error.status || 500;
    const message = error.message || "It's not you. It's us. We are having some problems.";
    const description = error.description || "";
  
    return response.status(status).send({status,message,description});
  }
    return next();
};