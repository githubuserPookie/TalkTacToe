const mongoose = require("mongoose");
const User = require("../models/users.js");

const addFriend = (req, res) => {
    const createdUser = new User({username: "person", password: "pass"});
    createdUser.save()
        .then((res) => {
            res.json({"requestSent": "true"});
        })
        .catch((err) => {
            res.json({"err": "true"});
            console.log(err);
        });
}

module.exports = { addFriend };