//주로 업로드 후 메인화면을 다룰 예정

const express = require("express");
const router = express.Router();
const Post = require("../models/post");
const User = require("../models/user"); 
const Storypost = require("../models/storypost");
const asyncHandler = require("express-async-handler");
const { checkLogin } = require("../controllers/user");
const { upload, getSortedFiles } = require("../controllers/uploadfile");

router.get("/dm", checkLogin, asyncHandler(async(req, res) => {
    const userId = req.user.id; // 로그인한 사용자의 ID를 받아옴
    console.log("userId:", userId);
    res.render("dm", { userId: userId });
}));

router.get("/profile", checkLogin, asyncHandler(async(req, res) => {
    const userId = req.user.id; // 로그인한 사용자의 ID를 받아옴
    const user = await User.findOne({id: userId});
    const posts = await Post.find().sort({ createdAt: -1 });
    const storyposts = await Storypost.find().sort({ createdAt: -1 });
    const sortedFiles = getSortedFiles();
    res.render("profile", { userId , storyposts , user , posts ,  files: sortedFiles});
}));


module.exports = router;