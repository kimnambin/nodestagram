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

module.exports = router;