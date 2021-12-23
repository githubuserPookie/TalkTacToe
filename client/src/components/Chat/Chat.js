import { React, Component, useState, useEffect } from "react";
import Message from './Message';
import './Message.css';
import './Chat.css';
import io from 'socket.io-client';

let socket;
const ENDPOINT = "http://localhost:5000";

function Chat(props) {
    const [messages, addMesssage] = useState([]);
    const [textMsgInputHeight, checkHeight] = useState("50");
    const [chatName, changeName] = useState();
    let updatedMessages = messages;
    
    const sendMessage = event => {
        event.preventDefault();
        const {value} = document.getElementById("enter-msg-form-text-input");
        updatedMessages.push(value);
        addMesssage(updatedMessages);
        // console.log(messages);
        let newMsg = messages;
        // console.log(newMsg.join(" "))
    }
    
    useEffect(async() => {
        changeName((prevName) => {
            let newChatName = window.location.pathname.split("/");
            newChatName = newChatName[2];
            newChatName = newChatName.replace(/%20/g, " ")
            return(newChatName);
        });
        socket = io(ENDPOINT, {
            "force new connection" : true,
            "reconnectionAttempts": "Infinity", 
            "timeout" : 10000,                  
            "transports" : ["websocket"]}
        )
        socket.emit('join', chatName);
        try{
            const fetchData = await fetch(`http://127.0.0.1:5000/api${window.location.pathname}`);
            const fetchDataJSON = await fetchData.json();
            const msgContainer = document.getElementById("msg-container");
            const messagesArr = fetchDataJSON.messages;
            addMesssage(messagesArr);
            console.log(messages);
        }
        catch(err){
            console.log(err)
        }
    }, [])
    // componentDidMount() {
        // this.loadMessages();
    return (
        <div>
            <h1 id="chat-name">{chatName}</h1>
            <div id="background-msg-container"></div>
            <div id="background-blur"></div>
            <div id="msg-container">
                <div dangerouslySetInnerHTML={{ __html: (messages.join(" "))/*.replace(/,/g, "")*/}}></div>
                <form id="enter-msg-form" autoComplete="off" onSubmit={sendMessage}>
                    <input type="text" placeholder="Enter Your Message" id="enter-msg-form-text-input"></input>
                    <input type="submit" value="send" id="enter-msg-form-submit-input" wrap="soft"></input>
                </form>
            </div>
        </div>
    )
}

export default Chat;