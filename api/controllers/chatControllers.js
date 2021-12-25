const User = require("../models/users.js");
const Chat = require("../models/chats.js");
const { response } = require("express");

const loadChatMessages = (req, res) => {
    const chatName = req.params.name;
    Chat.find({name: chatName}, async(err, data) => {
        if(data[0] && !err){
            const messages = data[0].messages;
            res.json({messages: messages});
        }
        else {  
            res.json({err: "not found"});
        }
    })
}

const addMessage = async(req, res) => {
    try{
        const { message, chatName } = req.body;
        const username = req.session.username;
        await Chat.findOneAndUpdate(
            {
                name: chatName
            }, {
            $push: {
                messages: [[message, username]]
            }
        })
        console.log("added");
        res.json({added: true});
    }
    catch(err) {
        console.log("not added");
        response.json({added: false});
        console.log(err + " is err");
    }
}

module.exports = { loadChatMessages, addMessage };