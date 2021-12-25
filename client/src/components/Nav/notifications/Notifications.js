import React, { useRef } from 'react';
import './Notifications.css';
import Notification from './Notification/Notification';

function Notifications(props) {
    const containerNotifications = useRef();
    const exitNotifications = () => containerNotifications.current.style.display = "none";
    console.log(props.notifications + "is prop");
    const notificationsArr = props.notifications.map((currentNotification) => {
        console.log(currentNotification + "is current notification");
        return([currentNotification + "edited"]);
    })
    console.log(notificationsArr + "is not array")
    return(
        <div>
            <div id="container-notifications" ref={containerNotifications}>
                <h1 id="notifications-main-text">Invites</h1>
                <div id="notifications-accept-decline-container">
                    {props.notifications.map((currentNotification, i) => {
                        return(<Notification notification={currentNotification} key={i} />)
                    })}
                </div>
                <h1 id="exit-notifications" onClick={exitNotifications}>X</h1>
            </div>
        </div>
    )
}

export default Notifications;