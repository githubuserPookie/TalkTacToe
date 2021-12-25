import { React, Component } from 'react';
import { Link } from "react-router-dom";
import './Nav.css';

class Nav extends Component {
    constructor(){
        super();
    }
    render(){
        const showContainerLogin = () => {
            document.getElementById(`container-login`).style.display = 'block';
            document.getElementById(`container-login`).style.opacity = 0.5;
            document.getElementById(`formAuth-login`).style.display = 'block'; 
        }
        const showContainerNotifications = () => {
            document.getElementById("container-notifications").style.display = "block";
        }
        const showContainerRegister = () => {
            document.getElementById(`container-register`).style.display = 'block';
            document.getElementById(`container-register`).style.opacity = 0.5;
            document.getElementById(`formAuth-register`).style.display = 'block';
        }
        const logout = async() => {
            await fetch("/api/auth/logout");
            window.location.reload();
        }
        const showAddFriend = () => {
            document.getElementById("form-add-friend").style.display = "block";
            document.getElementById("container-add-friend").style.display = "block";
        }
        
        if(this.props.loggedIn === "true"){
            return(
                <div> 
                    <img className="logo" src="logo.png" alt="logo" />
                    <ul className="nav-ul">
                        <li><h1 onClick={logout}>logout</h1></li>
                        <li><h1 onClick={showAddFriend}>Add Friend</h1></li>
                        <li><h1 onClick={showAddFriend}>Add Server</h1></li>
                        <li><img src="notification-bell-default.png" alt="notification bell" onClick={showContainerNotifications} /></li>
                    </ul>
                </div>
            )
        }
        
        return(
            <div>
                <img className="logo" src="logo.png" alt="logo" />
                <ul className="nav-ul">
                    <li><h1 onClick={showContainerLogin}>Login</h1></li>
                    <li><h1 id="register" onClick={showContainerRegister}>Register</h1></li>
                </ul>
            </div>
            
        )
    }
};

export default Nav;