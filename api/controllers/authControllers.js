const expressSession = require("express-session");
const User = require("../models/users");
const bcrypt = require("bcrypt");

const checkLogin = (req, res) => {  
    try{
        if(req.session.username !== undefined){
            User.find({username: req.session.username}, async(err, data) => {
                if(err){
                    res.json({loggedIn: "false"});
                }
                else {
                   res.json({
                       loggedIn: "true", 
                       username: req.session.username, 
                       invites: data[0].invites, 
                       friends: data[0].friends,
                       groupChats: data[0].groupChats
                    }); 
                }
                
            })
            
        }  
        else{
            res.json({loggedIn: "false"});
        }
    }                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         
    catch(err) {
        res.json({loggedIn: "false"});
    }
};

const register = async(req, res) => {
    const usernameInput = req.body.username;
    const passwordInput = req.body.password;
    console.log(passwordInput + usernameInput)
    //check to see if username and password are valid
    if(!usernameInput || typeof usernameInput !== "string"){
        res.json({result: "Invalid Username"});
        return;
    }
    if(!passwordInput || typeof passwordInput !== "string"){
        res.json({result: "Invalid Password"});
        return;
    }
    
    //hash password
    passwordInputHashed = await bcrypt.hash(passwordInput, 10)

    //create new user
    const createdUser = new User({
        username: usernameInput, 
        password: passwordInputHashed});
    try{
        await createdUser.save();
        req.session.username = usernameInput
        res.json({result: "logged in"})
    }
    catch(err){
        res.json({result: "db err"})
    }
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