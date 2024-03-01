//express
const express = require("express");

const app = express();

//ejs 사용
app.set("view engine", "ejs");
app.set("views", "./views");

app.use(express.static("./public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//라우터 부분
app.use("/" , require("./routes/login_sign"));


// 서버 실행
app.listen(3000, () => {
    console.log('서버 실행 중');
});