import mongoose from 'mongoose'

const postSchema = mongoose.Schema({
    title: String,
    user_id: String,
    full_name: String,
    message: String,
    inspired: {
        type: Number,
        default: 0
    },
    tags: {
        type: [String]
    },
    createdAt: {
        type: Date,
        default: new Date()
    },
    images: {
        public_id: {
            type: String,
        },
        url: {
            type: String,
        }
    },
    status: {
        type: String,
        default: 'Active'
    }
})

const PostMessage = mongoose.model('PostMessage', postSchema)

export default PostMessage