const express = require("express");
const router = express.Router();

const {
    login , 
    signUp ,
    sendOTP ,
    changePassword
} = require("../controllers/Auth")

const {
    resertPassword ,
    resetPasswordToken
} = require("../controllers/ResetPassword")

const {auth} = require("../middelwares/auth")


router.post("/login", login);
router.post("/signup", signUp);
router.post("/sendotp", sendOTP);
router.post("/changepassword", auth, changePassword);

router.post("/reset-password-token", resetPasswordToken);
router.post("/reset-password", resertPassword);

module.exports = router;