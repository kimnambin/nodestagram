const express = require("express");
const router = express.Router();
const {getLogin , loginUser , getRegister , registerUser} = require("../controllers/user");


router.route("/")
    .get(getLogin)
    .post(loginUser);

    router.route("/sign")
    .get(getRegister)
    .post(registerUser);
    
    // router.route("/main")
    // .get((req,res)=>{
    //     res.render("main",{});
    // })

    // router.route("/upload")
    // .get((req,res)=>{
    //     res.render("upload",{});
    // })
   
//     router.route("/upload")
//     .get((req,res)=>{
//         res.render("upload",{});
//     })
//     .post(async (req, res) => { 
    
//     const userId = req.user._id; // 현재 로그인한 사용자의 ID 가져오기

//         // 사용자가 입력한 정보 디비에 저장
//         const post = await Post.create({
//             body: body,
//             uploadimg: uploadimg,
//             userId: userId,
//             createdAt: new Date()
//         });
//         res.redirect("/main");
//     } 
// );



module.exports = router;