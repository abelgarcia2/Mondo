import mongoose from 'mongoose';
const { Schema } = mongoose

const PlaceSchema = new Schema({
    title: {
        type: String,
        unique: true,
        trim: true
    },

    subtitle: {
        type: String,
        trim: true
    },

    description: {
        type: String,
        trim: true
    },

    labels: {
        type: Array,
        lowercase: true,
        trim: true
    },

    location: {
        lat: Number,
        lng: Number
    },

    images: [{ type: String }]
},
    {
        versionKey: false,
        timestamps: true
    });

export default mongoose.model('Place', PlaceSchema)