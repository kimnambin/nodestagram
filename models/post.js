const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
    body: {
        type: String,
        required: true
    },
    img:{
        data: Buffer,
        contentType: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("Post", postSchema);

