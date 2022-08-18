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
Object.defineProperty(exports, "__esModule", { value: true });
exports.existUserById = exports.emailExist = void 0;
const Usuario = require('../models/usuario');
const emailExist = (correo) => __awaiter(void 0, void 0, void 0, function* () {
    const existMail = yield Usuario.findOne({ correo });
    if (existMail) {
        throw new Error(`The mail ${correo} is already occuped`);
    }
});
exports.emailExist = emailExist;
const existUserById = (_id) => __awaiter(void 0, void 0, void 0, function* () {
    const existUser = Usuario.findById(_id);
    if (!existUser)
        throw new Error(`The user with id ${_id} doesn't exist`);
});
exports.existUserById = existUserById;
//# sourceMappingURL=db-validators.js.map