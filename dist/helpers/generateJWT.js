"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createJWT = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const createJWT = (uid, name, mail) => {
    return new Promise((resolve, reject) => {
        const payload = { uid, name, mail };
        jsonwebtoken_1.default.sign(payload, process.env.SECRETORPRIVATEKE + "", {
            expiresIn: '100h'
        }, (err, token) => {
            if (err) {
                console.log(err);
                reject("Token wasn't created ");
            }
            else {
                resolve(token);
            }
        });
    });
};
exports.createJWT = createJWT;
//# sourceMappingURL=generateJWT.js.map