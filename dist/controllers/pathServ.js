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
exports.putPathServ = exports.getPathServ = exports.postPathServ = void 0;
const PathModel = require('../models/path');
const postPathServ = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const path = req.body.path;
    const nuevoPath = new PathModel({ path });
    yield nuevoPath.save();
    return res.status(200).json({
        msg: 'Link creado con exito',
    });
});
exports.postPathServ = postPathServ;
const getPathServ = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const path = yield PathModel.find();
    return res.status(200).json({
        path
    });
});
exports.getPathServ = getPathServ;
const putPathServ = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // const userSend = await Usuario.findByIdAndUpdate( id, user, { new: true } );
    const path = req.body.path;
    const pathSend = yield PathModel.findByIdAndUpdate("63449923a155a4064796be38", { path }, { new: true });
    return res.status(200).json({
        msg: "El path fue actualizado",
        path
    });
});
exports.putPathServ = putPathServ;
//# sourceMappingURL=pathServ.js.map