const express = require("express");
const router = express.Router()
const { registerUser, authUser,allUsers } = require('../controllers/UserControllers');
const { protect } = require("../middlewares/authMiddleware");

// This way you can nest the get and post request on the same route
router.route("/").post(registerUser).get(protect,allUsers);
router.post("/login", authUser);

module.exports = router;