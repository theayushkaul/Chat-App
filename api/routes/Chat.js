const express = require("express");
const router = express.Router()
const {
    accessChat,
    fetchChats,
    createGroup,
    removeFromGroup,
    addToGroup,
    renameGroup,
} = require("../controllers/chatControllers");
const { protect } = require("../middlewares/authMiddleware");

// Creating/Accessing the chat, fetching the chats of the loggedin user
router.route("/").post(protect, accessChat).get(protect, fetchChats)

// Routes for Group Chat: Creation of new group, renaming the group, removing/adding people from/to group
router.post("/newgroup", protect, createGroup)
router.put("/renameGroup", protect, renameGroup)
router.put("/removefromgroup", protect, removeFromGroup)
router.put("/addtogroup", protect, addToGroup)

module.exports = router;