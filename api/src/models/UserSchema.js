import bcrypt from 'bcryptjs'
import mongoose from 'mongoose'
const { Schema } = mongoose

const UserSchema = new Schema({
    username: {
        type: String,
        unique: true,
        trim: true
    },

    email: {
        type: String,
        unique: true,
        trim: true,
        lowercase: true
    },

    password: {
        type: String
    },

    created_places: [{
        type: Schema.Types.ObjectId,
        ref: 'Place'
    }]
},
    {
        versionKey: false,
        timestamps: true
    });

UserSchema.pre('save', async function (next) {
    const user = this

    if (user.isModified('password'))
        user.password = await bcrypt.hash(user.password, 10)

    next()
})

export default mongoose.model('User', UserSchema)