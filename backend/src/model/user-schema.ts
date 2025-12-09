import moongose from "mongoose"
import mongoose, { Schema } from "mongoose"


const schema = new Schema({
    user_id: { type: String, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true }
})

export const vyaktifyMediaUserCollection = mongoose.model("vyaktifyMediaUserCollection", schema);