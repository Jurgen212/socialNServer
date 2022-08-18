import express, { Application } from "express";

import cors from "cors";

import { dbConnection } from '../database/config';



class Server {

    private app : Application   ;
    private port: string        ;
    private apiPath = {
        usuarios: '/api/usuarios',
        login   : '/api/login'
    };


    constructor(){
        this.app    = express()                     ;
        this.port   = process.env.PORT || "8080"    ;


        //Connect to database

        this.connectDb();

        //Start the middlewares
        this.middlewares();

        //Active the routes
        this.routes()
    }

    async connectDb(){

        await dbConnection();
    }


    middlewares(){


        //Cors
        this.app.use( cors() );

        //Lectura del body
        this.app.use( express.json() );

        //Publica ( contenido estatico )
        this.app.use( express.static('public')  );
    }


    routes(){

        this.app.use( this.apiPath.usuarios ,  require('../routes/usuarios'  ) );
        this.app.use( this.apiPath.login    ,  require('../routes/auth'      ) );
    };


    listen(){

        this.app.listen( this.port, () => {
            console.log("Server running in port " + this.port );
        })
    }
}


export default Server;