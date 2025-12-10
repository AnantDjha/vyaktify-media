import mongoose from 'mongoose'

import { Schema } from 'mongoose'

const replyScchem = new Schema({
    subject: { type: String },
    body: { type: String },
    date_time: { type: Date, default: new Date() }
})

const schema = new Schema({
    id: { type: Number, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: false },
    description: { type: String, required: true },
    seen: { type: Boolean, default: false },
    reply: { type: replyScchem, default: null },
    date_time: { type: Date, default: new Date() },
})


export const vyaktifymediaMessageCollection = mongoose.model("vyaktifymediaMessageCollection", schema);