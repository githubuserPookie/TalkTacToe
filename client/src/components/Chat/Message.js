import { React, Component } from "react";
import './Message.css';

class Message extends Component {
    constructor(){
        super();
    }
    render(){
        return (
            <div>
                <br/><h1 className={this.props.senderWho}>{this.props.username}: </h1><h1 className={this.props.sender}>{this.props.message}</h1>
            </div>
        )
    }
}

export default Message;