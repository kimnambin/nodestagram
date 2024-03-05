const express = require("express");
const router = express.Router();
const Post = require("../models/post");
const User = require("../models/user"); 
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
function getfilename() {
    // 이미지 파일 이름을 가져옴
    const files = fs.readdirSync(uploadsDir);
    // 파일 이름을 정렬하여 반환 (역순으로 해서 최근에 업로드 한게 위로 올 수 있게함)
    return files.sort((a, b) => b.localeCompare(a));
}




router.get("/main", checkLogin, asyncHandler(async (req, res) => {
    const userId = req.user.id; //이건 아이디를 화면에 보여지게 하기 위함

    // 사용자가 입력한 아이디를 검증하기 위해 존재하는 사용자인지 확인
    const user = await User.findOne({ id: userId }); 

    // 최근 업로드 가져오기
    const post = await Post.findOne({ userId: userId }).sort({ createdAt: -1 });

    // 포스트가 없는 경우 처리
    const body = post ? post.body : '';
    const sortedFiles = getfilename();

    res.render("main", { user: user, userId: userId, files: sortedFiles, body: body });
}));



router.post("/main", checkLogin, upload.single('img'), asyncHandler(async (req, res) => {
    const { body } = req.body;
    const imgPath = req.file.path;

    // 사용자가 입력한 정보를 디비에 저장
    const post = await Post.create({
        body: body,
        img: imgPath,
    });
    
    res.redirect(`/main?id=${req.user.id}`);
}));

router.get("/upload", checkLogin, asyncHandler(async(req, res) => {
    const userId = req.user.id; // 로그인한 사용자의 ID를 받아옴
    console.log("userId:", userId);
    res.render("upload", { userId: userId });
}));


module.exports = router;
