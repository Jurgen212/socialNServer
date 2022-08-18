import express from 'express';
import jwt from 'jsonwebtoken';

const Usuario = require('../models/usuario');

export const validateJWT = async ( req: any , res: any, next: any ) => {

    const token = req.header('x-token');

    if( !token ) return res.status( 401 ).json({ msg: 'No token in the petition ( header: x-token )'} );


    try{


        const { uid }: any = jwt.verify( token, process.env.SECRETORPRIVATEKEY + "");
        
        const usuario = await Usuario.findByID( uid );

        //Validate the user
        if( !usuario ) return res.status( 401 ).json({ msg:'Token is not valid - The user doesn`t exist' });

        //Validate if the user is active
        if( !usuario.estado ) return res.status( 401 ).json({ msg: 'Token is not valid - The user isn`t active'});

        req.usuario = usuario;

        next();

    } catch( error  ){

        console.log( error )
        throw new Error( "Problem in the JSWT autentication :(" );
    }
}