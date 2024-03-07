//express
const express = require("express");
const app = express();
//db 적용하기
require("dotenv").config();
const db = require("./config/db");
//로그인한 정보 확인하기 (메인에서 아이디 표시를 위함)
const cookieParser = require('cookie-parser');
const mongoose = require("mongoose"); // mongoose 추가
const path = require('path');

//ejs 사용
app.set("view engine", "ejs");
app.set("views", "./views");

db();

app.use(express.static("./public"));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());



//라우터 부분
app.use("/", require("./routes/login_sign"));
app.use("/", require("./routes/mainupload"));
app.use("/", require("./routes/dm"));

// 서버 실행
app.listen(3000, () => {
    console.log('서버 실행 중');
});
