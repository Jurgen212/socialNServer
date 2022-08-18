import mongoose from "mongoose";

export const dbConnection = async () => {


    try{

        await mongoose.connect( process.env.mongoDB_CNN! );

        console.log("Database online");
    } catch( error ){

        console.log( error );
        throw new Error( 'Failed to connect with the db');
    }
}