const User = require("../models/users.js");
const Chat = require("../models/chats.js");

const loadChatMessages = (req, res) => {
    const chatName = req.params.name;
    Chat.find({name: chatName}, async(err, data) => {
        console.log(data[0]);
        if(data[0] && !err){
            const messages = data[0].messages;
            res.json({messages: messages});
        }
        else {  
            res.json({err: "not found"});
        }
    })
}

module.exports = { loadChatMessages };