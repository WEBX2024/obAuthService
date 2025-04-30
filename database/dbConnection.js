import mongoose from "mongoose";

export const connection = () =>{
    mongoose.connect(process.env.MONGO_URI, {
        dbName: "omor-sathi"
    }).then(()=>{
        console.log("connected to database....");
    }).catch(err=>{
        console.log(`some error occured while connecting to database: ${err}`);
    });
};