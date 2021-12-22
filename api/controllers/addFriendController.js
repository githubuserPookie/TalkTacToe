const mongoose = require("mongoose");
const User = require("../models/users.js");

const addFriend = async(req, res) => {
    const createdUser = new User({username: "person", password: "pass"});
    try{
        await createdUser.save();
        res.json({"requestSent": "true"});
    }
    catch(err){
        res.json({"err": "true"});
        console.log(err);
    }
}

module.exports = { addFriend };