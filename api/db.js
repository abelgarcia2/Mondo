import mongoose from "mongoose";

mongoose.connect(process.env.MONGODB_URI)
    .then((db) => console.log('DB is connected'))
    .catch((error) => console.error(error));