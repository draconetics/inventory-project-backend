import { NextFunction } from "express";
import { HttpException } from "../../common/HttpException"
import { IBrand} from "../../interfaces/IBrand"

export const validate = (body:IBrand):void=>{
    let message = "";
    let codeIsUndefined = body.code === undefined;
    let codeIsEmpty = body.code === "";
    let nameIsUndefined = body.name === undefined;
    let nameIsEmpty = body.name === "";
    if( codeIsUndefined || typeof body.code !== "string" )
        message = "Code is not type string and it is required"
    else if(codeIsEmpty)
        message = "Code is empty"
    if( nameIsUndefined || typeof body.name !== "string" )
        message = "Name is not type string and it is required"
    else if(nameIsEmpty)
        message = "Name is empty"
          
    if(message.length > 0)
        throw new HttpException(422,message)
}
