import React, { useEffect } from 'react';
import './Notification.css';

function Notification(props) {
    useEffect(() => {
        
    })
    const rejects = document.querySelectorAll(".reject");
    const accepts = document.querySelectorAll(".accept");
    console.log(props.username + "is username1")
    const respondedInvite = async(event, username, response) => {
        console.log(username + response);
        try{
            await fetch("/api/respondInvite", {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({
                    response,
                    friendUsername: username
                })
            }) 
            
        }
        catch(err){
            console.log(err);
            alert("error has occured");
        }
    } 
    return (
        <div className='notification-container'>
            <br/><h1 className="notification">{props.notification}</h1>
            <div className="images-container">
                <div>
                    <img src="./check-mark.png" className='accept' name={props.propKey} onClick={(e) => respondedInvite(e, props.username[props.i], "accepted")} />
                    <img src="./reject.png" className='reject' name={props.propKey} onClick={(e) => respondedInvite(e, props.username[props.i], "rejected")} />
                </div>
            </div>
        </div>
    )
}

export default Notification;