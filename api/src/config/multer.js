import multer from "multer";
import { nanoid } from "nanoid";
import path from "path";

const storage = multer.diskStorage({
    destination: 'uploads',
    filename: (req, file, callback) => {
        callback(null, nanoid() + path.extname(file.originalname))
    }
})

export default multer({
    storage,

    limits: {
        fileSize: 10485760
    },

    fileFilter: (req, file, cb) => {
        file.mimetype.slice(0, 5) !== 'image'
            ? cb(null, false)
            : cb(null, true)
    }
})