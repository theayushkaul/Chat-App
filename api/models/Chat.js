const mongoose = require("mongoose")

const Chat = mongoose.Schema({
    chat:{
        type:String,
        trim:true
    },
    isGroupChat:{
        type:Boolean,
        default: false
    },
    users: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }],
    latestMessage:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Message"
    },
    groupAdmin:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
},{timestamps:true})

module.exports = mongoose.model("Chat",Chat)