//데이터 베이스에 접속하는 코드

const mongoose = require("mongoose");
const asyncHandler = require("express-async-handler");
require("dotenv").config();

const db = asyncHandler(async () => {
    const connect = await mongoose.connect(process.env.DB_CONNECT);
    console.log(`DB Connected: 연결완료용`);
});

module.exports = db;