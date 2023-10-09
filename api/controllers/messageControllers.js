const expressAsyncHandler = require("express-async-handler")
const Message = require("../models/Message")
const User = require("../models/User")
const Chat = require('../models/Chat')
const sendMessage = expressAsyncHandler(async (req, res) => {
    const { content, chatId } = req.body;
    if (!content || !chatId) {
        return resizeBy.sendStatus(400);
    }
    
    let newMessage = {
        sender: req.user._id,
        content: content,
        chat: chatId
    }
    
    try {
        let message = await Message.create(newMessage);
        message = await message.populate("sender", "name profilePic");
        message = await message.populate("chat");
        message = await User.populate(message, {
            path: "chat.users",
            select: "name profilePic email"
        })
        
        await Chat.findByIdAndUpdate(req.body.chatId, { latestMessage: message })
        res.json(message);
    } catch (error) {
        res.status(400);
        throw new Error(error.message);
    }
})


const allMessages = expressAsyncHandler(async (req, res) => {
    try {
        const messages = await Message.find({ chat: req.params.chatId })
            .populate("sender", "name pic email")
            .populate("chat");
        res.json(messages);
    } catch (error) {
        res.status(400);
        throw new Error(error.message);
    }
})


module.exports = { sendMessage, allMessages }