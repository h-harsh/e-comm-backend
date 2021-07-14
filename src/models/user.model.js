const mongoose  = require('mongoose')

const UserSchema = mongoose.Schema({
    fullName: {
        type: String,
        required: [true, "Name is required"]
    },
    userName: {
        type: String,
        unique: true,
        required: [true, "Name is required"]
    },
    email: {
        type: String,
        uique: true,
        required: [true, "mail is required"]
    },
    password: {
        type: String,
        required: [true, "Password ke liye bhi bole kya ab"]
    }
})

const User = mongoose.model('User', UserSchema)

module.exports = {User}