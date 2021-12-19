const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// const dbURI = "mongodb+srv://cmdrpookie:rKtJyOkUHw52WsZ6@chatcat.lwhro.mongodb.net/chatcat?retryWrites=true&w=majority";
// mongoose.connect(dbURI);

const userSchema = new Schema({
    username: {
        type: String
    },
    password: {
        type: String
    }
})

const User = mongoose.model("User", userSchema);

module.exports = User;