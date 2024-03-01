const express = require("express");
const router = express.Router();

router.route("/")
    .get((req, res) => {
        res.render("login", {}); 
    });

    router.route("/sign")
    .get((req, res) => {
        res.render("sign", {}); 
    });
    
    router.route("/main")
    .get((req,res)=>{
        res.render("main",{});
    })

module.exports = router;