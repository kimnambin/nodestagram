//주로 업로드 후 메인화면을 다룰 예정

const express = require("express");
const router = express.Router();
const Post = require("../models/post");
const User = require("../models/user");
const Storypost = require("../models/storypost");
const asyncHandler = require("express-async-handler");
const { checkLogin } = require("../controllers/user");
const { upload, getSortedFiles } = require("../controllers/uploadfile");




router.route("/mainpage")
    .get(checkLogin, asyncHandler(async (req, res) => {
        const userId = req.user.id; // 사용자 아이디
        const user_id = await User.findOne({id: userId}); // 이건 현재 로그인한 아이디
        const users = await User.find({ id: { $ne: userId }});
        
        // 모든 포스트 가져오기
        const posts = await Post.find().sort({ createdAt: -1 });
        // 모든 스토리 가져오기
        const storyposts = await Storypost.find().sort({ createdAt: -1 });
    
        // 포스트가 없는 경우 처리
        const body = posts.length > 0 ? posts[0].body : '';
        const sortedFiles = getSortedFiles();
        console.log("user 모델 전달확인:", req.user);
        console.log("post 모델 전달확인:", req.post);
        res.render("mainpage",{ user_id, users , userId, files: sortedFiles, body, posts, storyposts});
    }));



router.post("/mainpage", checkLogin, upload.single('img'), asyncHandler(async (req, res) => {
        const { body } = req.body;
        const imgPath = req.file.path;
        const userId = req.user.id; // 현재 로그인한 사용자의 아이디
    
        // 사용자가 입력한 정보와 현재 로그인한 사용자의 아이디를 포스트에 저장
        const post = await Post.create({
            body: body,
            img: imgPath,
            userId: userId, // 현재 로그인한 사용자의 아이디 저장
        });
        
        res.redirect(`/mainpage?id=${req.user.id}`);
    }));
    


    router.get("/upload", checkLogin, asyncHandler(async(req, res) => {
        const userId = req.user.id; // 로그인한 사용자의 ID를 받아옴
        console.log("로그인 한 아이디:", userId);
        res.render("upload", { userId: userId });
    }));
    

module.exports = router;