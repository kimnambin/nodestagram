//주로 업로드 후 메인화면을 다룰 예정

const express = require("express");
const router = express.Router();
const Post = require("../models/post");
const User = require("../models/user");
const Storypost = require("../models/storypost");
const asyncHandler = require("express-async-handler");
const multer = require("multer");
const { checkLogin } = require("../controllers/user");
const path = require('path');
const fs = require("fs");

// 이미지 업로드를 위한 multer 설정
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // 이미지가 저장될 경로 설정
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname); // 이미지 파일의 이름 설정
    }
});

const upload = multer({ 
    storage: storage,
    fileFilter: function (req, file, cb) {
        var ext = path.extname(file.originalname);
        if (ext !== '.png' && ext !== '.jpg' && ext !== '.jpeg') {
            return cb(new Error('다른 파일로 업로드 하세요.'));
        }
        cb(null, true);
    },
    limits: {
        fileSize: 50 * 1024 * 1024
    }
});

// 이미지 파일 경로
const uploadsDir = path.join(__dirname, "../uploads");

// 파일 이름 정렬
function getSortedFiles() {
    // 이미지 파일 이름을 가져옴
    const files = fs.readdirSync(uploadsDir);
    // 파일 이름을 역순으로 정렬하여 반환
    return files.sort((a, b) => b.localeCompare(a));
}


router.route("/mainupload")
    .get(checkLogin, asyncHandler(async (req, res) => {
        const userId = req.user.id; // 사용자 아이디
        
        const user = await User.findOne({id: userId}); // 이건 현재 로그인한 아이디
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
        res.render("mainupload", { user: user, users: users , userId: userId, files: sortedFiles, body: body ,posts: posts, storyposts:storyposts });
    }));




    
router.post("/mainupload", checkLogin, upload.single('img'), asyncHandler(async (req, res) => {
        const { body } = req.body;
        const imgPath = req.file.path;
        const userId = req.user.id; // 현재 로그인한 사용자의 아이디
    
        // 사용자가 입력한 정보와 현재 로그인한 사용자의 아이디를 포스트에 저장
        const post = await Post.create({
            body: body,
            img: imgPath,
            userId: userId, // 현재 로그인한 사용자의 아이디 저장
        });
        
        res.redirect(`/mainupload?id=${req.user.id}`);
    }));
    


    router.get("/upload", checkLogin, asyncHandler(async(req, res) => {
        const userId = req.user.id; // 로그인한 사용자의 ID를 받아옴
        console.log("로그인 한 아이디:", userId);
        res.render("upload", { userId: userId });
    }));
    

module.exports = router;