const express = require("express");
const router = express.Router();
const verifyUser = require('../midlleware/auth')
const { register,login, userDetails } = require('../controllers/auth')



router.post("/register", register);
router.post("/login", login)
router.get("/userdetails", verifyUser, userDetails)



module.exports = router;