const mongoose = require("mongoose");

const storypostSchema = new mongoose.Schema({
    img: {
        data: Buffer,
        contentType: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    userId: {
        type: String,
        required: true 
    }
});

module.exports = mongoose.model("Storypost", storypostSchema);