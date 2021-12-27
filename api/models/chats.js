const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const chatSchema = new Schema({
    name: {
        type: String,
        unique: true,
        require: true
    },
    users: {
        type: Array,
    },
    messages: {
        type: Array
    }
});

const Chat = mongoose.model("chat", chatSchema);

module.exports = Chat;