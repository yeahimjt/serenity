import mongoose from 'mongoose'

const userSchema = mongoose.Schema({
    full_name: String,
    email_address: String,
    password: String,
    anonymous:{
        type: Boolean,
        default: false
    },
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
    follow_list: {
        user_id: {
            type: [String]
        }
    },
    follower_list: {
        user_id: {
            type: [String]
        }
    }
}, {collection: 'userdata'})

const UserData = mongoose.model('UserData', userSchema)

export default UserData