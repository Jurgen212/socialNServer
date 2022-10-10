"use strict";
var { Schema, model } = require('mongoose');
const pathSchema = Schema({
    ruta: {
        type: String,
        required: [true, "El link/ruta del servidor es obligatorio"]
    }
});
pathSchema.methods.toJSON = function () {
    return this.toObject();
};
module.exports = model("PathServer", pathSchema);
//# sourceMappingURL=pathServ.js.map