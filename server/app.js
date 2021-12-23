//import the packages we need
const express = require("express");
const expressSession = require("express-session")
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const socketio = require("socket.io");
const http = require("http");
const cors = require("cors");

//create server & connect socket
const app = express();
const server = http.createServer(app);
const io = socketio(server);

io.on("connection", socket => {
    console.log("client connected");
    socket.on("disconnect", () => {
        console.log("client disconected")
    });
    socket.on("join", (roomName) => {
        socket.join
    })
})

//import the modules for routing the users request
const addFriendRouter = require("../api/routes/addFriendRoute.js");
const authRouter = require("../api/routes/authRoute.js");
const chatRouter = require("../api/routes/chatRoute.js")

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

app.use(bodyParser.urlencoded({extended: true}));
app.use(expressSession({
    secret: "secret-key",
    resave: false,
    saveUninitialized: false
}));
app.use(express.json());
// app.use(cors);
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    next();
})
app.use("/api/addFriend", addFriendRouter);
app.use("/api/auth", authRouter);
app.use("/api/chat", chatRouter);
app.use(cors());
app.use(
    cors({
        origin: "http://127.0.0.1:3000",
        methods: ["GET", "POST", "PUT", "DELETE"]
    })
)
app.get("/", (req, res) => {
    res.send();
})

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`server is litenning on port ${PORT}`));