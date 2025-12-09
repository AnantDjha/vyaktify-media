import moongose from "mongoose"
import { Schema } from "mongoose"


const workSchema = new Schema({
    id: {
        type: Number,
        required: true,
        unique: true
    },
    title: {
        type: String,
        required: true,
        trim: true,
    },
    client: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
    },
    categoryId: {
        type: Number,
        required: true,
        min: 1,
        max: 9
    },
    results: {
        type: [String],
        required: true,
    },
    image: {
        type: Buffer,
        required: true,
        default: '/service1.jpg'
    },
    color: {
        type: String,
        required: true,
        default: 'from-amber-500 to-yellow-500'
    },
    bgColor: {
        type: String,
        required: true,
        default: 'bg-gradient-to-br from-amber-500/10 to-yellow-500/10'
    },
    duration: {
        type: String,
        required: true,
        default: '2-4 weeks'
    },
    tech: {
        type: [String],
        required: true,
        validate: {
            validator: function (array: string[]) {
                return array.length > 0 && array.length <= 10;
            },
            message: 'Tech stack must have between 1 and 10 items'
        }
    },

})

const vyaktifyMediaWorkCollection = moongose.model("vyaktifyMediaWorkCollection", workSchema)

export default vyaktifyMediaWorkCollection;