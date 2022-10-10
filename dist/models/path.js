"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const pathSchema = new mongoose_1.Schema({
    path: {
        type: String,
        required: [true, "El path es obligatorio, desde modelo pathServ"]
    }
});
pathSchema.methods.toJSON = function () {
    return this.toObject();
};
module.exports = (0, mongoose_1.model)("PathModel", pathSchema);
//# sourceMappingURL=path.js.map