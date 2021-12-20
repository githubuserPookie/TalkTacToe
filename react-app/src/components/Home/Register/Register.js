import { React, Component } from 'react';
import './Register.css';

class Register extends Component {
    constructor(){
        super();
    }
    render(){
        const register = async(e) => {
            e.preventDefault();
            const usernameInput = document.getElementById("username").value;
            const passwordInput = document.getElementById("password").value;
            const fetchData = await fetch("/api/auth/register", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username: usernameInput,
                    password: passwordInput
                })
            });
            const fetchDataJson = await fetchData.json();
            if(fetchDataJson.result !== "logged in"){
                alert(fetchDataJson.result);
            }
            else {
              window.location.reload();  
            }
        }
        const exitRegister = () => {
            document.getElementById(`container-register`).style.display = 'none';
            document.getElementById(`container-register`).style.opacity = 0;
            document.getElementById(`formAuth-register`).style.display = 'none';
        }
        return(
            <div>
                <div id="container-register"></div>
                <form id="formAuth-register" autoComplete='off'>
                    <label>Register</label><br/>
                    <input type="search" placeholder="username" className="authInput"></input><br/>
                    <input type="search" placeholder='password' className="authInput" type="password"></input><br/>
                    <input type="submit" id='register-submit' value='Register'></input>
                    <h1 id="exit-register" onClick={exitRegister}>X</h1>
                </form>
            </div>
        )
    }
}

export default Register;