import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'

import postRoutes from './routes/posts.js';
import userRoutes from './routes/users.js'
import cookieParser from 'cookie-parser';

dotenv.config();
const app = express();
app.use(cookieParser())

app.use(bodyParser.json({ limit: "500mb", extended: true} ));
app.use(bodyParser.urlencoded({ limit: "500mb", extended: true} ));
var corsOptions = {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
    credentials: true,
    exposedHeaders: ["Set-Cookie"],

}
app.use(cors(corsOptions));
app.use('/posts', postRoutes)
app.use('/users', userRoutes)

const CONNECTION_URL = 'mongodb+srv://jonathanandrewtrevino:yB6UJxlgVCHcESV3@serenity.gf3rgbp.mongodb.net/?retryWrites=true&w=majority'
const PORT = process.env.PORT || 5000;

mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => app.listen(PORT, () => console.log(`Server running on port ${PORT}`)))
    .catch((err)=> console.log(err.message))

