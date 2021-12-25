import React from 'react';
import './Notification.css';

function Notification(props) {

    return (
        <div className='notification-container'>
            <br/><h1 className="notification">{props.notification}</h1>
            <div className="images-container">
                <div>
                    <img src="./check-mark.png" className='accept'/>
                    <img src="./reject.png" className='reject' />
                </div>
            </div>
            
        </div>
    )
}

export default Notification;