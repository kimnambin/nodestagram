const express = require("express");
const router = express.Router();
const {getLogin , loginUser , getRegister , registerUser} = require("../controllers/user");


router.route("/")
    .get(getLogin)
    .post(loginUser);

    router.route("/sign")
    .get(getRegister)
    .post(registerUser);
    
    router.route("/main")
    .get((req,res)=>{
        res.render("main",{});
    })

    router.route("/upload")
    .get((req,res)=>{
        res.render("upload",{});
    })



module.exports = router;