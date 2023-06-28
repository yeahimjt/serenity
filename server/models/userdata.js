import mongoose from 'mongoose'

const userSchema = mongoose.Schema({
    full_name: String,
    email_address: String,
    password: String,
    anonymous: Boolean,
    createdAt: {
        type: Date,
        default: new Date()
    },
}, {collection: 'userdata'})

const UserData = mongoose.model('UserData', userSchema)

export default UserData