import mongoose from 'mongoose'

const messageSchema = mongoose.Schema({
    recipient: String,
    sender: String,
    text: String,
    createdAt: {
        type: Date,
        default: new Date()
    },
}, {collection: 'messages', timestamps: true})

const MessageData = mongoose.model('MessageData', messageSchema)

export default MessageData