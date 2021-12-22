import { React, Component, useState, useEffect } from "react";
import Message from './Message';
import './Message.css';
import './Chat.css';

// import io from "socket.io-client";
// import parse from 'html-react-parser';

class Chat extends Component {
    constructor(){
        super()
        this.state = {
            messages: [],
            textMsgInputHeight: "50px"
        }
        this.loadMessages = this.loadMessages.bind(this);
        this.sendMessage = this.sendMessage.bind(this);
        this.checkHeight = this.checkHeight.bind(this);
    }
    checkHeight(e) {
        console.log("change occured")
        const scrollHeight = e.target.style.height;
        this.setState({
            textMsgInputHeight: scrollHeight
        });
        console.log(scrollHeight)
    }
    async loadMessages() {
        const fetchData = await fetch(`/api${window.location.pathname}`);
        const fetchDataJSON = await fetchData.json();
        const msgContainer = document.getElementById("msg-container");
        let messagesArr = fetchDataJSON.messages;
        for(let i = 0; i < messagesArr.length; i++){
            this.setState(prevState => {
                let messagesToAdd = prevState.messages;
                messagesToAdd.push(messagesArr[i]);
                return {
                    messages: messagesToAdd
                }
            });
        }
    }
    async sendMessage(e){
        e.preventDefault();
        const {value} = e.target.value;
        console.log(e);
    }

    componentDidMount() {
        this.loadMessages();
    }
    render(){
        return(
            <div>
                <h1 id="chat-name">Groop Chat</h1>
                <div id="background-msg-container"></div>
                <div id="background-blur"></div>
                <div id="msg-container">
                    <div dangerouslySetInnerHTML={{ __html: this.state.messages.toString()}}></div>
                    <form id="enter-msg-form" autoComplete="off">
                        {/* <input type="text" placeholder="Enter Your Message" id="enter-msg-form-text-input"></input> */}
                        <textarea onChange={this.checkHeight} placeholder="Enter Your Message" id="enter-msg-form-text-input" autoFocus="autofocus" maxLength="500"></textarea>
                        <input type="submit" value="send" id="enter-msg-form-submit-input" wrap="soft"></input>
                    </form>
                </div>
            </div>
        )
    }
}

export default Chat;