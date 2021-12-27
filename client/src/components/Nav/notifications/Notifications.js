import React, { useRef } from 'react';
import './Notifications.css';
import Notification from './Notification/Notification';

function Notifications(props) {
    const containerNotifications = useRef();
    const exitNotifications = () => containerNotifications.current.style.display = "none";
    const notificationsArr = props.notificationsPrivate.map((currentNotification) => {
        return([currentNotification + "edited"]);
    })
    return(
        <div>
            <div id="container-notifications" ref={containerNotifications}>
                <h1 id="notifications-main-text">Invites</h1>
                <div id="notifications-accept-decline-container">
                    {props.notificationsPrivate.map((currentNotification, i) => {
                        const { privateNames } = props;
                        return(privateNames != undefined ? (<Notification notification={currentNotification} i={i} username={props.privateNames[i]} key={i} />) : "")           
                    })}
                    {/* {props.notificationsGroup.map((currentNotification, i) => {
                        const { privateNames } = props;
                        return(privateNames != undefined ? (<Notification notification={currentNotification} i={i} username={props.privateNames[i]} key={i} />) : "")
                        
                    })} */}
                </div>
                <h1 id="exit-notifications" onClick={exitNotifications}>X</h1>
            </div>
        </div>
    )
}

export default Notifications;