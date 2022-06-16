import jwt from 'jsonwebtoken'
import User from '../models/UserSchema.js'

export const verifyToken = async (req, res, next) => {
    const token = req.headers.jwt

    if (req.headers.jwt == 'undefined')
        return res.status(401).json({ message: 'You must be logged in' })



    if (!token) return res.status(401).json({ message: 'You must be logged in' })

    const decodedToken = jwt.verify(token, process.env.SECRET)

    try {
        const user = await User.findById(decodedToken.id)

        if (user == null) return res.status(404).json({ message: 'user not found' })

        next()
    } catch (error) {
        res.status(400).json({ message: 'The id is not valid' })
    }
}