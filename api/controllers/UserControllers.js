const asyncHandler = require("express-async-handler")
const User = require("../models/User")
const generateToken = require("../config/generateToken")
const bcrypt = require("bcrypt")

const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password, profilePic } = req.body
    
    if (!name || !email || !password) {
        res.status(400);
        throw new Error("Please enter all the fields")
    }
    const userExists = await User.findOne({ email })

    if (userExists) {
        res.status(400);
        throw new Error("User already exists");
    }
    // Encryption of the password using Bcrypt
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt)

    const user = await User.create({
        name:name,
        email: email,
        password:hashedPassword,
        profilePic:profilePic
    })
    if (user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            profilePic: user.profilePic,
            token: generateToken(user._id)
        })
    } else {
        res.status(400);
        throw new Error("Failed to create new User")
    }
})

const authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body
    const user = await User.findOne({ email });
    // Comparing the password in request and of the actual user 
    const ismatched = await bcrypt.compare(password,user.password);
    
    if (user && ismatched) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            profilePic: user.profilePic,
            token: generateToken(user._id)
        })
    } else {
        res.status(400);
        throw new Error("Failed to create new User")
    }
})

module.exports = { registerUser, authUser }