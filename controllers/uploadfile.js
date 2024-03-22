// 피드 업로드를 위한 미들웨어 부분

const multer = require("multer");
const path = require('path');
const fs = require("fs");
const exp = require("constants");

// 이미지 업로드를 위한 multer 설정
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // 이미지가 저장될 경로 설정
    },
    filename: function (req, file, cb) {
        const userId = req.user.id;
        cb(null, userId + '-' + Date.now() + '-' + file.originalname); // 이미지 파일의 이름 설정
        
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

// 이미지 파일 경로
const uploadsDir = path.join(__dirname, "../uploads");

// 파일 이름 정렬
function getSortedFiles() {
    // 이미지 파일 이름을 가져옴
    const files = fs.readdirSync(uploadsDir);
    // 파일 이름을 역순으로 정렬하여 반환
    return files.sort((a, b) => b.localeCompare(a));
}

module.exports = { upload, getSortedFiles };