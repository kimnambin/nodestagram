// 스토리 업로드를 위한 미들웨어 부분!!

const multer = require("multer");
const path = require('path');
const fs = require("fs");
const exp = require("constants");

// multer 설정
const storage2 = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadsDir);
    },
    filename: function (req, file, cb) {
        const userId = req.user.id;
        cb(null, userId + '-'  + Date.now() + '-' + file.originalname); 
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
const uploadsDir = path.join(__dirname, "../storys");


// 파일 이름 가져오기
function generateFileName() {
    // 이미지 파일 이름들을 가져옴
    const files2 = fs.readdirSync(uploadsDir);
    return files2.sort((a, b) => b.localeCompare(b));
}

module.exports = { upload2, generateFileName };