
const  Usuario = require('../models/usuario');

export const emailExist = async( correo: string) => {

    const existMail = await  Usuario.findOne({ correo });
    if( existMail ){
        throw new Error(`The mail ${ correo } is already occuped`)
    }

}

export const existUserById = async( _id: string ) => {

    const existUser = Usuario.findById( _id );
    if( !existUser ) throw new Error(`The user with id ${ _id } doesn't exist`);
}