import bcryptjs from 'bcrypt';
import { createJWT } from '../helpers/generateJWT';

const Usuario = require('../models/usuario');

export const loginController = async ( req: any, res: any ) =>{


    const { correo, password } = req.body;


    try{

        const user  = await Usuario.findOne({ correo });

        if( !user ) return res.status( 400 ).json({ msg: 'The mail / password are incorrect'});

        if( !user.estado ) return res.status( 400 ).json({ msg: 'That account doen`t exist ( inactive )'});

        const validPassword = bcryptjs.compareSync( password, user.password );

        if( !validPassword ) return res.status( 400 ).json({ msg:'Invalid password - Please try again'});

        const token = await createJWT( user.id );


        return res.json({
            user,
            token
        })
    
    } catch( err ){
        console.log( err );

        return res.status( 500 ).json({
            msg:'Talk with the administrator :c'
        })
    }  

}