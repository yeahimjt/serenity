import mongoose from 'mongoose'

const postSchema = mongoose.Schema({
    title: String,
    user_id: Number,
    message: String,
    inspired: String,
    inspired: {
        type: Number,
        default: 0
    },
    tag: String,
    createdAt: {
        type: Date,
        default: new Date()
    },
})

const PostMessage = mongoose.model('PostMessage', postSchema)

export default PostMessage