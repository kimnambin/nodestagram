const express = require("express");
const router = express.Router();
const Post = require("../models/post");
const User = require("../models/user"); // User 모델을 require 해야 함
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
    const userId = req.query.id; // 쿼리 파라미터에서 userId를 받아옴
    const user = await User.findById(userId);
    res.render("main", { userId: userId, user: user }); // userId를 전달
}));



router.post("/main", checkLogin, upload.single('img'), asyncHandler(async (req, res) => {
    const { body } = req.body;
    const imgPath = req.file.path;

    // 사용자가 입력한 정보를 디비에 저장
    const post = await Post.create({
        body: body,
        img: imgPath,     
    });

    res.redirect(`/main?id=${req.user._id}`); // 로그인한 사용자의 ID를 쿼리 파라미터로 전달
}));




router.get("/upload", checkLogin, asyncHandler(async(req,res) => {
    const userId = req.user._id; // 로그인한 사용자의 ID를 받아옴
    const user = await User.findById(userId);
    res.render("upload" , { user: user });
}));


// router.get("/upload/:id", asyncHandler(async (req, res) => {
//     // const userId = req.params.id;
//     const data = await User.findOne({ _id: userId });
//     res.render("upload", { userData: data, checkLogin: req.checkLogin });
// }));

// router.post("/upload/:id", checkLogin, upload.single('img'), asyncHandler(async (req, res) => {
//     const { body } = req.body;
//     // const userId = req.params.id;

//     // 이미지 파일의 경로 가져오기
//     const imgPath = req.file.path;

//     // 사용자가 입력한 정보를 디비에 저장
//     const post = await Post.create({
//         body: body,
//         img: imgPath,
        
//     });

//     res.redirect("/main");
// }));

module.exports = router;
