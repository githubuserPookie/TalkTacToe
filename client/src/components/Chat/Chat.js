import { React, Component, useState, useEffect } from "react";
import Message from './Message';
import './Message.css';
import './Chat.css';
import io from 'socket.io-client';
import { useRef } from 'react'
import ReactScrollableFeed from 'react-scrollable-feed';
import ScrollToBottom from 'react-scroll-to-bottom';

let socket;
const ENDPOINT = "http://localhost:5000";

function Chat(props) {
    const [messages, setMessages] = useState([]);
    const [textMsgInputHeight, checkHeight] = useState("50");
    const [chatName, changeName] = useState();
    const msgContainer = useRef(null);
    const inputBar = useRef();
    // const scrollToBottom = () => {
    //     console.log("change");
    //     inputBar.current.scrollIntoView();
        
    //     console.log("scrolled to bottom");
    // }
    const sendMessage = async(event) => {
        event.preventDefault();
        const {value} = document.getElementById("enter-msg-form-text-input");
        document.getElementById("enter-msg-form-text-input").value = "";
        await fetch("/api/chat/addMessage", {
            method: 'POST',
            body: JSON.stringify({
                message: value,
                chatName: chatName
            }),
            headers: {
                'Content-Type': 'Application/json'
            }
        })
        socket.emit("send-msg", value, props.username);
    }
    useEffect(async() => {
        if(props.username === ""){
            // alert(props.username);
            // alert("login to acess this chat");
            // window.location.replace("/");
            console.log("not logged in" + props.username);
        }
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
        socket.on("msg", (msg, username) => {
            setMessages((prevMessages) => { 
                return([...prevMessages, [msg, username]]);
            })
        });
        try{
            const fetchData = await fetch(`http://127.0.0.1:5000/api${window.location.pathname}`);
            const fetchDataJSON = await fetchData.json();
            // const msgContainer = document.getElementById("msg-container");
            const messagesArr = fetchDataJSON.messages;
            setMessages(messagesArr);
            console.log(messages);
            if(messagesArr === undefined){
                window.location.replace("/");
                alert("Chat not found");
            }
        }
        catch(err){
            alert("error has occured")
            console.log(err)
        }
        // scrollToBottom();
    }, [])
    return(
        props.username !== "" ?
            (
                <div>    
                    <h1 id="chat-name">{chatName}</h1>
                    <div id="background-msg-container"></div>
                    <div id="background-blur"></div>
                    <div className="msg-container">
                    <ScrollToBottom className="msg-container">
                        {/* <div> */}
                        {messages.map((currentMsg, i) => {
                            return(<div key={i}><Message username={currentMsg[1]} message={currentMsg[0]} who={currentMsg[1] === props.username ? "me" : "other"} /></div>)
                        })}
                        {/* <div dangerouslySetInnerHTML={{ __html: messages !== undefined && (messages.join(""))/*.replace(/,/g, "")}></div> *//*}}></div> */}
                        <div className="container-form">
                            <form id="enter-msg-form" autoComplete="off" onSubmit={sendMessage} ref={inputBar}>
                                <input type="text" placeholder="Enter Your Message" id="enter-msg-form-text-input"></input>
                                <input type="submit" value="send" id="enter-msg-form-submit-input" wrap="soft"></input>
                            </form> 
                        </div>
                    {/* </div> */}
                    </ScrollToBottom>
                    </div>
                </div>)
            
        : (<div>You do not have acess to this content</div>)
    )
}

export default Chat;