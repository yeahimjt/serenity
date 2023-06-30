import mongoose from 'mongoose'

const userSchema = mongoose.Schema({
    full_name: String,
    email_address: String,
    password: String,
    anonymous: Boolean,
    images: {
        public_id: {
            type: String,
        },
        url: {
            type: String,
        }
    },
    followers: {
        type: Number,
        default: 0,
    },
    following: {
        type: Number,
        default: 0,
    },
    stories: {
        type: Number,
        default: 0,
    },

    createdAt: {
        type: Date,
        default: new Date()
    },
}, {collection: 'userdata'})

const UserData = mongoose.model('UserData', userSchema)

export default UserData