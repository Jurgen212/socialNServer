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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUsuarios = exports.putUsuarios = exports.postUsuarios = exports.getUsuarios = exports.getUsuario = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const Usuario = require('../models/usuario');
const getUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const user = yield Usuario.findById(id);
    return res.status(200).json({ user });
});
exports.getUsuario = getUsuario;
const getUsuarios = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { limit = 10, from = 0, to = 5 } = req.query;
    const query = { estado: true };
    const [total, users] = yield Promise.all([
        Usuario.countDocuments(query),
        Usuario.find(query).skip(Number(from))
            .limit(Number(limit))
    ]);
    return res.status(200).json({
        total,
        users
    });
});
exports.getUsuarios = getUsuarios;
const postUsuarios = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { nombre, correo, password } = req.body;
    const user = new Usuario({ nombre, correo, password });
    //Hash password
    const salt = bcrypt_1.default.genSaltSync();
    user.password = bcrypt_1.default.hashSync(password, salt);
    //Save in DB
    yield user.save();
    return res.status(201).json({
        user
    });
});
exports.postUsuarios = postUsuarios;
const putUsuarios = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //TODO permitir actualizar el correo 
    const { id } = req.params;
    const _a = req.body, { _id, password, google, correo } = _a, user = __rest(_a, ["_id", "password", "google", "correo"]);
    if (password) {
        const salt = bcrypt_1.default.genSaltSync();
        user.password = bcrypt_1.default.hashSync(password, salt);
    }
    ;
    const userSend = yield Usuario.findByIdAndUpdate(id, user, { new: true });
    return res.status(201).json({
        id,
        userSend
    });
});
exports.putUsuarios = putUsuarios;
const deleteUsuarios = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const uid = req.uid;
    //Don't eliminate, only the status in false
    const user = yield Usuario.findByIdAndUpdate(id, { estado: false }, { new: true });
    return res.status(200).json({
        uid,
        msg: 'User was eliminated succesfulled',
        user
    });
});
exports.deleteUsuarios = deleteUsuarios;
//# sourceMappingURL=usuarios.js.map