import { Schema, model } from "mongoose";

const pathSchema = new Schema({
    path: {
        type: String,
        required: [true, "El path es obligatorio, desde modelo pathServ"]
    }
})

pathSchema.methods.toJSON = function(){
    return  this.toObject();
}

module.exports = model("PathModel", pathSchema ) ;