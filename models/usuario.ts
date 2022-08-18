
const { Schema, model } = require('mongoose');

const UsuarioSchema = Schema({

    nombre: {

        type: String                             ,
        required: [ true, "The name is required"]
    },
    correo: {

        type: String,
        required: [ true, "The mail is required"],
        unique : true
    },
    password: {

        type: String                                 ,   
        required: [ true, "The password is required"]
    },
    img: {

        type: String
    },
    estado: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    }
});


UsuarioSchema.methods.toJSON = function(){


    const { __v, password, _id, ...usuario } = this.toObject();

    usuario.uid = _id;

    return usuario;
}

module.exports = model('Usuario', UsuarioSchema );