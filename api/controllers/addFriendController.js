const mongoose = require("mongoose");
const User = require("../models/users.js");

const addFriend = async(req, res) => {
    const { friendName } = req.body;
    const { username } = req.session;
    console.log(friendName + username);
    try {
        const result = await User.findOneAndUpdate(
        {
            username: req.body.friendName
        }, {
            $push: {
                invites: [[username, "friend"]]
            }
        }
        );
        result !== null ? res.json({added: true}) : res.json({added: false});
    }
    catch(err) {
        res.json({added: "false"});
    }
}

module.exports = { addFriend };