//import the packages we need
const express = require("express");
const mongoose = require("mongoose");

//create server
const app = express();

//import the modules for routing the users request
const addFriendRouter = require("../api/routes/addFriendRoute.js");

//connect to db
const dbURI = require("./dbURI.js");
const connectToDb = async() => {
    try {
        await mongoose.connect(dbURI);
        console.log("connected to db");
    }
    catch(err){
        console.log(`failed to connect to db ${err}`);
    }
}
connectToDb();

app.use("/api/addFriend", addFriendRouter);

const port = process.env.PORT || 5000;
app.listen(port);