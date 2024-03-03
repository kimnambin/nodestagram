//로그인 + 회원가입과 관련된 컨트롤러
//여기서 설정하고 라우터에도 입력해줘야함

const asyncHandler = require("express-async-handler");
const User = require("../models/user");
const bcrypt = require("bcrypt");
//환경 변수 가져오기
require("dotenv").config();
const jwtSecret = process.env.JWT_SECRET;
const jwt = require("jsonwebtoken");

// "/"일 때 로그인 화면 보여주깅
const getLogin = (req,res) => {
    res.render("login");
} 

//로그인 하기 -> post
const loginUser = asyncHandler(async (req, res) => {
    const { id, pw } = req.body;

    // 입력된 값이 전화번호인지, 사용자명인지, 이메일인지 확인
    const user = await User.findOne({
        $or: [
            { number: id },
            { id: id },
            { name: id }
        ]
    });

    // 사용자가 존재하는지 확인
    if (!user) {
        return res.json({ message: '사용자를 찾을 수 없습니다.' });
    }

    // 비밀번호가 일치하는지 확인
    const isMatch = await bcrypt.compare(pw, user.pw);
    if (!isMatch) {
        return res.json({ message: '비밀번호가 일치하지 않습니다.' });
    }

    // 토큰 생성 및 쿠키에 저장
    const token = jwt.sign({ id: user._id }, jwtSecret);
    res.cookie("token", token, { httpOnly: true });

    // const userPosts = await Post.find({ userId: user._id });
    
     // 로그인 후 사용자 아이디를 표시
     res.render("main", { 
        userId: user.id, 
        userProfileImageSrc: "#"
        //userPosts: userPosts
    });
});




// 회원가입-> get
const getRegister = (req,res) => {
    res.render("sign");
}

// 사용자 등록하기 -> post
const registerUser = asyncHandler(async (req, res) => {
    const { number, name, id, pw } = req.body;
    if (pw) {
        // 사용자가 입력한 비밀번호를 암호화하여 hashedPassword에 저장
        const hashedPassword = await bcrypt.hash(pw, 10);
        // 사용자가 입력한 정보 디비에 저장
        const user = await User.create({
            number: number,
            name: name,
            id: id,
            pw: hashedPassword
        });
        res.redirect("/");
    } else {
        res.send("실패용 ㅠ.ㅠ");
    }
});

//로그인 체크 -> 관리자인지 아닌 지 확인하기
const checkLogin = (req, res, next) => {
    const token = req.cookies.token;
  
    // 토큰이 없으면 로그인 페이지로 이동
    if (!token) {
      res.redirect("/login");
    } else {
      // 토큰이 있다면 토큰을 확인하고 사용자 정보를 요청에 추가
      try {
        const decoded = jwt.verify(token, jwtSecret); // 토큰 해석하기
        req.user = { _id: decoded.id }; 
        next();
      } catch (error) {
        res.redirect("/main");
      }
    }
  };

module.exports = {getLogin , loginUser , getRegister , registerUser , checkLogin}