//주로 업로드 후 메인화면을 다룰 예정

const express = require("express");
const router = express.Router();
const Post = require("../models/post");
const User = require("../models/user"); 
const Storypost = require("../models/storypost");
const asyncHandler = require("express-async-handler");
const {checkLogin} = require("../controllers/user");
const {getSortedFiles} = require("../controllers/uploadfile");
const {profileFiles , profileupload} = require("../controllers/profileFile");


router.get("/dm", checkLogin, asyncHandler(async(req, res) => {
    const userId = req.user.id; // 로그인한 사용자의 ID를 받아옴
    console.log("userId:", userId);
    res.render("dm", { userId: userId });
}));

router.get("/profile/:user_id", checkLogin, asyncHandler(async(req, res) => {
    const userId = req.user.id; // 로그인한 사용자의 ID를 받아옴
    const user_id = req.params.user_id;
    const user = await User.findOne({id: userId});
    const users = await User.find({ id: { $ne: userId }});
    const posts = await Post.find();
    //const posts = await Post.find({ userId: req.params.user_id });
    const storyposts = await Storypost.find({userId : req.params.user_id});
    const sortedFiles = getSortedFiles();
    
    //나중에 프로필 이미지도 가져와야 함
    res.render("profile", { userId , storyposts , user ,user_id, users, posts , files: sortedFiles});
}));

router.post("/profile", checkLogin, profileupload.single('img'), asyncHandler(async (req, res) => {

    const imgPath = req.file.path;
    const user_id = req.params.user_id;
    const user = await User.create({
        img: imgPath,
    });
    
    res.redirect("/profile/" + user_id);
}));

module.exports = router;