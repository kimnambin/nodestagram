const express = require("express");
const router = express.Router();
const Post = require("../models/post");
const asyncHandler = require("express-async-handler");
const multer = require("multer");
const { checkLogin } = require("../controllers/user");
const path = require('path');

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

router.get("/main", checkLogin, asyncHandler(async (req, res) => {
    const userId = req.user._id; 
    const posts = await Post.find({ userId: userId }); 
    res.render("main", { userId: userId, posts: posts });
}));

router.post("/main", checkLogin, upload.single('img'), asyncHandler(async (req, res) => {
    const { body } = req.body; // 문구 데이터를 body에 할당
    const userId = req.user._id; // 사용자 ID를 가져옴
    const imgPath = req.file.path; // 이미지 파일의 경로를 가져옴

    // 사용자가 입력한 정보를 디비에 저장
    const post = await Post.create({
        body: body,
        img: imgPath, // 이미지의 경로를 저장
        userId: userId,
    });
    res.redirect("/main"); // 메인 페이지로 리다이렉트
}));

router.route("/upload")
    .get(checkLogin, (req, res) => {
        res.render("upload", {});
    })
    .post(checkLogin, upload.single('img'), asyncHandler(async (req, res) => {
        const { body } = req.body;
        const userId = req.user._id;

        // 이미지 파일의 경로 가져오기
        const imgPath = req.file.path;

        // 사용자가 입력한 정보를 디비에 저장
        const post = await Post.create({
            body: body,
            img: imgPath, // 이미지의 경로를 저장
            userId: userId,
        });

        res.redirect("/main");
    }));

module.exports = router;
