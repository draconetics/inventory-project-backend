import { HttpException } from "../../common/HttpException"
import { ISale} from "../../interfaces/ISale"

export const validate = (body:ISale):void=>{
    let message = '';
    const products = body.products;
    if( products && !products.length )
        message = "Array of products is required"
          
    if(message.length > 0)
        throw new HttpException(422,message)
}
