const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
    body: {
        type: String,
        required: true
    },
    imageUrl: {
        data:Buffer,
        contentType:String,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("Post", postSchema);
