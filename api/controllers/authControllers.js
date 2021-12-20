const expressSession = require("express-session");
const User = require("../models/users");
const bcrypt = require("bcrypt");

const checkLogin = (req, res) => {  
    try{
        if(req.session.username !== undefined){
            res.json({loggedIn: "true"});
        }  
        else{
            res.json({loggedIn: "false"});
        }
    }                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         
    catch(err) {
        res.json({loggedIn: "false"});
    }
};

const register = (req, res) => {
    const usernameInput = req.params.username;
    const passwordInput = req.params.password;
    User.find({username: usernameInput}, async(err, data) => {
        if(data[0]){
            const returnedData = data[0];
            const passwordDB = returnedData.password;
            const passwordMatch = await bcrypt.compare(passwordInput, passwordDB);
            if(!passwordMatch){
                res.json({result: "password does not match"})
            }
            else {
                res.json({result: "logged in"});
                req.session.username = usernameInput;
            }
        }
        else {
            res.json({result: "username not found"})
        }
    })
}

const login = (req, res) => {
    const usernameInput = req.body.username;
    const passwordInput = req.body.password;
    User.find({username: usernameInput}, async(err, data) => {
        if(data[0]){
            const returnedData = data[0];
            const passwordDB = returnedData.password;
            const passwordMatch = await bcrypt.compare(passwordInput, passwordDB);
            if(!passwordMatch){
                res.json({result: "password does not match"})
            }
            else {
                req.session.username = usernameInput;
                res.json({result: "logged in"});  
            }
        }
        else {
            res.json({result: "username not found"})
        }
    })
}

const logout = (req, res) => {
    req.session.username = undefined;
    res.json({result: "logged out"});
}

module.exports = { checkLogin, register, login, logout };