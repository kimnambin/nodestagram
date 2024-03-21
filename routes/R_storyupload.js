const express = require("express");
const router = express.Router();
const Storypost = require("../models/storypost");
const User = require("../models/user");
const asyncHandler = require("express-async-handler");
const { checkLogin } = require("../controllers/user");
const { upload2, generateFileName } = require("../controllers/storyfile");


router.get("/storyupload", checkLogin, asyncHandler(async(req, res) => {
    const userId = req.user.id; // 로그인한 사용자의 ID를 받아옴
    console.log("로그인 한 아이디:", userId);
    res.render("storyupload", { userId: userId });
}));

router.post("/storyupload", checkLogin, upload2.single('img'), asyncHandler(async (req, res) => {
    const imgPath = req.file.path;
    const userId = req.user.id; // 현재 로그인한 사용자의 아이디

    // 사용자가 올린 이미지와 로그인한 아이디 Storypost 모델에 저장
    const storypost = await Storypost.create({
        img: imgPath,
        userId: userId, // 현재 로그인한 사용자의 아이디 저장
    });

    res.redirect(`/mainupload?id=${req.user.id}`);
}));


router.get("/storydetail/:userId", 
checkLogin, asyncHandler(async(req, res) => {
    const userId = req.params.userId; 
    const user = await User.findOne({ id: userId }); 
    const storyposts = await Storypost.find({userId: req.params.userId});
    
    const files = generateFileName();
   
    res.render("storydetail", { user: user, userId: userId, storyposts: storyposts, files2: files });

}));




module.exports = router;
