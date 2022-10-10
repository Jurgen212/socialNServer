import express, { Application } from "express";

import cors from "cors";

import { dbConnection } from '../database/config'   ;
import http             from 'http'                 ;  

export default class Server {

    private app     : Application   ;
    private port    : string        ;
    private serverIo: http.Server   ; 

    

    private apiPath = {
        usuarios: '/api/usuarios',
        login   : '/api/login'   ,
        pathRuta: '/api/path'
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

        this.serverIo = http.createServer( this.app );        
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
        this.app.use( this.apiPath.pathRuta ,  require('../routes/path'      ) );
    };


    listen(){

        this.serverIo.listen( this.port, () => {
            console.log("Server running in port " + this.port );
        })

    }
}

