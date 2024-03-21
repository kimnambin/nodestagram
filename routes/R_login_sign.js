const express = require("express");
const router = express.Router();
const {getLogin , loginUser , getRegister , registerUser} = require("../controllers/user");


router.route("/")
    .get(getLogin)
    .post(loginUser);

router.route("/sign")
    .get(getRegister)
    .post(registerUser);
    

module.exports = router;