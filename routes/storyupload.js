const express = require("express");
const router = express.Router();
const Storypost = require("../models/storypost");
const User = require("../models/user");
const asyncHandler = require("express-async-handler");
const multer = require("multer");
const { checkLogin } = require("../controllers/user");
const path = require('path');
const fs = require("fs");

// multer 설정
const storage2 = multer.diskStorage({
    destination: function (req, file, cb) {
        // 저장할 디렉토리가 존재하지 않으면 생성
        const uploadsDir = path.join(__dirname, "../storys");
        if (!fs.existsSync(uploadsDir)) {
            fs.mkdirSync(uploadsDir);
        }
        cb(null, uploadsDir);
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

// multer 설정 수정
const upload2 = multer({ 
    storage: storage2,
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

// 파일 이름 정렬 함수 수정
function generateFileName() {
    const uploadsDir = path.join(__dirname, "../storys");
    // 이미지 파일 이름을 가져옴
    const files = fs.readdirSync(uploadsDir);
    // 파일 이름을 역순으로 정렬하여 첫 번째 파일의 이름을 반환
    return files.sort((a, b) => b.localeCompare(a))[0];
}



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

router.get("/storydetail", checkLogin, asyncHandler(async(req, res) => {
    const userId = req.user.id; // 로그인한 사용자의 ID를 받아옴
    const user = await User.findOne({id: userId}); 
    const storyposts = await Storypost.find().sort({ createdAt: -1 });

    const files = generateFileName();

    res.render("storydetail", { user: user, userId: userId , storyposts:storyposts , files: files});
}));

module.exports = router;
