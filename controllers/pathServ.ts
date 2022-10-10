import express from 'express';

const PathModel  = require('../models/path');


export const postPathServ = async( req: any, res: any ) => {


    const path = req.body.path;
    
    
    const nuevoPath = new PathModel( { path }   );

    await nuevoPath.save();

    return res.status(200).json({
        msg:'Link creado con exito',
        })
}

export const getPathServ = async( req: any, res: any ) => {


    const path = await PathModel.find();


    return res.status( 200 ).json({
        path
    })
}


export const putPathServ = async ( req: any, res: any ) =>{

    // const userSend = await Usuario.findByIdAndUpdate( id, user, { new: true } );
    const path = req.body.path;
    const pathSend = await PathModel.findByIdAndUpdate("63449923a155a4064796be38", { path }, { new: true })

    return res.status( 200 ).json({
        msg: "El path fue actualizado",
        path
    })
}