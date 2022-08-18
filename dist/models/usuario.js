"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
const { Schema, model } = require('mongoose');
const UsuarioSchema = Schema({
    nombre: {
        type: String,
        required: [true, "The name is required"]
    },
    correo: {
        type: String,
        required: [true, "The mail is required"],
        unique: true
    },
    password: {
        type: String,
        required: [true, "The password is required"]
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
UsuarioSchema.methods.toJSON = function () {
    const _a = this.toObject(), { __v, password, _id } = _a, usuario = __rest(_a, ["__v", "password", "_id"]);
    usuario.uid = _id;
    return usuario;
};
module.exports = model('Usuario', UsuarioSchema);
//# sourceMappingURL=usuario.js.map