"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateFiles = void 0;
const validateFiles = (req, res, next) => {
    if (!req.files || Object.keys(req.files).length === 0 || !req.files.archivo) {
        return res.status(400).send('No file to send -- Archivo( body )');
    }
    ;
    next();
};
exports.validateFiles = validateFiles;
//# sourceMappingURL=validate-file.js.map