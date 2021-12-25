import { React, Component } from "react";
import './Message.css';

function Message(props) {
    return (
        <div>
            <br/><h1 className={`username-${props.who}`}>{props.username}: </h1><h1 className={`message-${props.who}`}>{props.message}</h1>
        </div>
    )
}

export default Message;