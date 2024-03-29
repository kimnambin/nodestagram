// 사용자 정보 부분

const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    number: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true,
        unique: true
    },
    id: {
        type: String,
        required: true,
        unique: true,
    },
    pw: {
        type: String,
        required: true
    },
    img: {
        data: Buffer,
        contentType: String
    },
});

module.exports = mongoose.model("User" , userSchema);