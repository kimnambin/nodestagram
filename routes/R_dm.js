//주로 업로드 후 메인화면을 다룰 예정

const express = require("express");
const router = express.Router();
const Post = require("../models/post");
const User = require("../models/user"); 
const asyncHandler = require("express-async-handler");
const { checkLogin } = require("../controllers/user");

router.get("/dm", checkLogin, asyncHandler(async(req, res) => {
    const userId = req.user.id; // 로그인한 사용자의 ID를 받아옴
    console.log("userId:", userId);
    res.render("dm", { userId: userId });
}));

module.exports = router;