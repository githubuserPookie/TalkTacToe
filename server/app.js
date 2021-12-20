//import the packages we need
const express = require("express");
const mongoose = require("mongoose");

//create server
const app = express();

//import the modules for routing the users request
const addFriendRouter = require("../api/routes/addFriendRoute.js");
const authRouter = require("../api/routes/authRoute.js");

//connect to db
const dbURI = require("./dbURI.js");
const connectToDb = async() => {
    try {
        await mongoose.connect(dbURI);
        console.log("connected to db");
    }
    catch(err){
        console.log(err);
    }
}
connectToDb();

app.use("/api/addFriend", addFriendRouter);
app.use("/api/auth", authRouter);

const port = process.env.PORT || 5000;
app.listen(port);