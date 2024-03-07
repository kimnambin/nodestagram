const express = require("express");
const router = express.Router();
const User = require("../models/user"); 
const asyncHandler = require("express-async-handler");
const { checkLogin } = require("../controllers/user");


//여기엔
router.get(checkLogin, asyncHandler(async (req, res) => {
    const userId = req.user.id; //이건 아이디를 화면에 보여지게 하기 위함

    const user = await User.findOne({ id: userId }); 
    
    // 최근 업로드 가져오기
    const post = await Post.findOne({ userId: userId }).sort({ createdAt: -1 });

    // 포스트가 없는 경우 처리
    const body = post ? post.body : '';
    const sortedFiles = getSortedFiles();

    // main 템플릿으로 files 변수를 전달하여 렌더링
    res.render("main", { user: user, userId: userId, files: sortedFiles, body: body });
}));



module.exports = router;