import jwt from 'jsonwebtoken'

import User from '../models/UserSchema.js'
import { checkPasswordMatch } from '../utils/utils.js'
import { JoiUserSchema } from '../validation/JoiUserSchema.js'

const login = async (req, res) => {
    const reqUser = req.body
    const foundUser = await User.findOne({ email: reqUser.email })

    if (!foundUser) return res.status(404).json({ message: 'User not found' })


    if (!await checkPasswordMatch(reqUser.password, foundUser.password))
        return res.status(401).json({ message: 'The password is not correct' })

    const token = jwt.sign({ id: foundUser._id }, process.env.SECRET)

    res.status(200).json({ message: "Succesfully login", token: token })
}

const register = async (req, res) => {
    const reqUser = req.body
    const validation = JoiUserSchema.validate(reqUser)
    const { error } = validation

    if (error) {
        const msg = error.details[0].message

        return res.status(400).json({ message: 'Invalid fields', error: msg })
    }

    const newUser = new User(reqUser)

    try {
        await newUser.save()

        const token = jwt.sign({ id: newUser._id }, process.env.SECRET)


        res.status(201).json({ message: "The user was created succesfully", token: token })
    } catch (error) {
        if (error.code === 11000)
            res.status(400).json({ message: 'The user already exists' })
        else
            res.status(500).json({ message: 'Internal Server Error', error })
    }
}

export { login, register }