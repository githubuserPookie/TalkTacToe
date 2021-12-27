const User = require("../models/users.js");
const Chat = require("../models/chats.js");

const respondToInvite = async(req, res) => {
    const { response, friendUsername } = req.body;
    console.log(response + friendUsername)
    try {
        if(response === "accepted"){            
            await User.findOneAndUpdate({username: req.session.username}, {$pull: {invitesPrivate: { $in: [friendUsername]}}});
            await User.findOneAndUpdate({username: req.session.username}, {$push: {privateChats: [friendUsername]}});
            await User.findOneAndUpdate({username: friendUsername}, {$push: {privateChats: [req.session.username]}});

            res.json({});
            // await User.updateMany({ $or: [{username: "1"}, {username: "Alexandre"}]}, {$push: {privateChats: [""]}}/*(err, data) => {
            //     if(err) {
            //         console.log(err);
            //     }
            //     else {
            //         console.log(data)
            //     }
            // }*/);
            // await User.find({username: friendUsername}, (err, data) => {
            //     if(err){
            //         console.log(err);
            //     }
            //     else {
            //         console.log(data);
            //     }
            // });
        }
        else {
            console.log("rejected");
            await User.findOneAndUpdate({username: req.session.username}, {$pull: {invitesPrivate: { $in: [friendUsername]}}});
            res.json({});
        }
    }
    catch(err){
        res.json({}).status(404);
        console.log(err);
    }
}

module.exports = { respondToInvite };