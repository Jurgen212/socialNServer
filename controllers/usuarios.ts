
import express from 'express';

import bcryptjs from 'bcrypt';

const Usuario = require('../models/usuario');

export const getUsuario = async ( req: any, res: any ) =>{

    const { id } = req.params;
    const user = await Usuario.findById( id );

    return res.status( 200 ).json({ user });
};



export const getUsuarios = async ( req: any, res: any ) =>{

    const { limit = 10, from = 0, to = 5 } = req.query;

    const query = { estado: true };

    const [ total, users ] = await Promise.all([
        Usuario.countDocuments( query ),
        Usuario.find( query ).skip( Number( from ))
        .limit( Number( limit ) )
    ]);

    return res.status( 200 ).json({
        total,
        users
    })
};



export const postUsuarios = async ( req: any, res: any ) =>{

    const { nombre, correo, password } = req.body;

    const user = new Usuario( {nombre, correo, password });


    //Hash password

    const salt      = bcryptjs.genSaltSync();
    user.password   = bcryptjs.hashSync( password, salt );


    //Save in DB

    await user.save();

    return res.status( 201 ).json({
        user
    })

};

export const putUsuarios = async ( req: any, res: any ) =>{

    //TODO permitir actualizar el correo 

    const { id }                                        = req.params;
    const { _id, password, google, correo, ...user }    = req.body  ;

    if( password ){

        const salt      = bcryptjs.genSaltSync()                ;
        user.password   = bcryptjs.hashSync( password, salt )   ;
    };

    const userSend = await Usuario.findByIdAndUpdate( id, user, { new: true } );

    
    return res.status( 201 ).json({
        id, 
        userSend
    })
};

export const deleteUsuarios = async ( req: any, res: any ) =>{

    const { id } = req.params;

    const uid    = req.uid;

    //Don't eliminate, only the status in false

    const user = await Usuario.findByIdAndUpdate( id, { estado: false }, { new: true });

    return res.status( 200 ).json({
        uid,
        msg:'User was eliminated succesfulled',
        user
    })
};


