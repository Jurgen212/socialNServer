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
exports.loginController = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const generateJWT_1 = require("../helpers/generateJWT");
const Usuario = require('../models/usuario');
const loginController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { correo, password } = req.body;
    try {
        const user = yield Usuario.findOne({ correo });
        if (!user)
            return res.status(400).json({ msg: 'The mail / password are incorrect' });
        if (!user.estado)
            return res.status(400).json({ msg: 'That account doen`t exist ( inactive )' });
        const validPassword = bcrypt_1.default.compareSync(password, user.password);
        if (!validPassword)
            return res.status(400).json({ msg: 'Invalid password - Please try again' });
        const token = yield (0, generateJWT_1.createJWT)(user.id, user.correo, user.password);
        return res.json({
            user,
            token
        });
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({
            msg: 'Talk with the administrator :c'
        });
    }
});
exports.loginController = loginController;
//# sourceMappingURL=auth.js.map