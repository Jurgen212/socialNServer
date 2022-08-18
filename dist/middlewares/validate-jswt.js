"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateJWT = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const Usuario = require('../models/usuario');
const validateJWT = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.header('x-token');
    if (!token)
        return res.status(401).json({ msg: 'No token in the petition ( header: x-token )' });
    try {
        const { uid } = jsonwebtoken_1.default.verify(token, process.env.SECRETORPRIVATEKEY + "");
        const usuario = yield Usuario.findByID(uid);
        //Validate the user
        if (!usuario)
            return res.status(401).json({ msg: 'Token is not valid - The user doesn`t exist' });
        //Validate if the user is active
        if (!usuario.estado)
            return res.status(401).json({ msg: 'Token is not valid - The user isn`t active' });
        req.usuario = usuario;
        next();
    }
    catch (error) {
        console.log(error);
        throw new Error("Problem in the JSWT autentication :(");
    }
});
exports.validateJWT = validateJWT;
//# sourceMappingURL=validate-jswt.js.map