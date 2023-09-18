const mongoose = require("mongoose")

const User = mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    profilePic:{
        type: String,
        required: true,
        default:"https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
    }
},{timestamps:true})

module.exports = mongoose.model("User",User)