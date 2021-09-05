import mongoose from 'mongoose';
//const DB_URI = 'mongodb://localhost/inventory-project';
const DB_URI = 'mongodb+srv://dracon:dracon@cluster0.mqjp1.mongodb.net/inventory?retryWrites=true&w=majority'
const DB_PROD = 'mongodb+srv://dracon:dracon@cluster0.mqjp1.mongodb.net/inventory?retryWrites=true&w=majority'
const DB_TESTING = 'mongodb://localhost/c04-typescript-testing';



const connect = ()=> {
    return new Promise((resolve, reject) => 
        {
            let uri = DB_URI
            if (process.env.NODE_ENV === 'test') 
                uri = DB_TESTING
            if(process.env.NODE_ENV === 'production')
                uri = DB_PROD
            //developer mode
            connectToDataBase(resolve, reject, uri);                
        }
    );//end promise
}

const connectToDataBase = (resolve: Function, reject:Function, url:string)=>
{
    mongoose.connect(url, {useNewUrlParser: true, useCreateIndex: true,  useUnifiedTopology: true, useFindAndModify:false })
        .then(()=> resolve())
        .catch((err:Object) => reject(err));
}
    
const closeConnection = ()=> mongoose.disconnect();


export = { connect, closeConnection };