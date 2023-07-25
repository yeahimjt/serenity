import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'
import jwt from 'jsonwebtoken';


import postRoutes from './routes/posts.js';
import userRoutes from './routes/users.js'
import messageRoutes from './routes/messages.js'
import cookieParser from 'cookie-parser';
import {WebSocketServer} from 'ws'

import MessageData from './models/messages.js'


dotenv.config();
const app = express();
app.use(cookieParser())


app.use(bodyParser.json({ limit: "500mb", extended: true} ));
app.use(bodyParser.urlencoded({ limit: "500mb", extended: true} ));
// var corsOptions = {
//     origin: 'http://localhost:3000',
//     methods: ['GET', 'POST'],
//     credentials: true,
//     exposedHeaders: ["Set-Cookie"],

// }
var corsOptions = {
    origin: ['https://grand-gnome-76f510.netlify.app'],
    methods: ['GET', 'POST'],
    credentials: true,
    exposedHeaders: ["Set-Cookie"],
}

// Insert corsoptions into cors() appropriately for localhost
app.use(cors(corsOptions));
app.use('/posts', postRoutes)
app.use('/users', userRoutes)
app.use('/messages', messageRoutes)

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((error) => {if (error) throw error})
    .catch((err)=> console.log(err.message))

// Running server
const server = app.listen(PORT)

// Handling web socket for messages
const wss = new WebSocketServer({server});
wss.on('connection', (connection,req) => {
    // Get User Data from their cookies
    const cookies = req.headers.cookie
    if (cookies) {
        const cookieToken = cookies.split(';').find(str=>str.startsWith('tokenn='))
        if (cookieToken) {
            const token = cookieToken.split('=')[1];
            if (token) {
                jwt.verify(token, process.env.SECRET_PHRASE, {}, (err, userData) => {
                    if (err) throw err
                    const {id, full_name, source} = userData.user;
                    connection.id = id
                    connection.full_name= full_name
                    connection.source= source
                })
            }
        }

    }

    // Notifies all users on website about who is currently online
    [...wss.clients].forEach(client=> {
        client.send(JSON.stringify({
            online: [...wss.clients].map(cl => ({id: cl.id, full_name: cl.full_name, source: cl.source}))
        }
        ))
    })

    connection.on('message', async (message)=> {
        const messageData = JSON.parse(message.toString())
        console.log("i have been called", messageData)
        const {recipient, sender,text,_id} = messageData
        const storedMessage = await MessageData.create({
            sender,
            recipient,
            text
        })

        if (recipient && text) {
            [...wss.clients]
                .filter(cl=> cl.id === recipient )
                .forEach(cl=>  cl.send(JSON.stringify({
                    sender,
                    recipient,
                    text,
                    _id: Date.now(),
                })))
        }
    })
})
