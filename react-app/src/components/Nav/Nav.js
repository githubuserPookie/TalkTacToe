import { React, Component } from 'react';
import { Link } from "react-router-dom";
import './Nav.css';

class Nav extends Component {
    constructor(){
        super();
    }
    render(){
        const logout = async() => {
            console.log("clicked");
        }
        if(this.props.loggedIn === "true"){
            return(
                <div>   
                    <img className="logo" src="logo.png" alt="logo" />
                    <ul className="nav-ul">
                        <li><Link to="/" onClick={logout}>logout</Link></li>
                    </ul>
                </div>
            )
        }
        
        return(
            <div>
                <img className="logo" src="logo.png" alt="logo" />
                <ul className="nav-ul">
                    <li><Link to="/auth/login">Login</Link></li>
                    <li><Link to="/auth/register" id="register">Register</Link></li>
                </ul>
            </div>
            
        )
    }
};

export default Nav;