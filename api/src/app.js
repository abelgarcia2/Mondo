import dotenv from 'dotenv/config';
import express from "express";
import morgan from 'morgan';
import bodyParser from 'body-parser';
import cors from 'cors'

import '../db.js'

import placesRoutes from './routes/places.routes.js'
import usersRoutes from './routes/users.routes.js'

import path from 'path';

const app = express()

app.use(cors())

app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.json())
app.use(morgan('dev'))

app.listen(process.env.PORT, console.log('Server started on port ' + process.env.PORT))

app.use('/places', placesRoutes)
app.use('/users', usersRoutes)
app.use('/uploads', express.static(path.resolve('./uploads')))