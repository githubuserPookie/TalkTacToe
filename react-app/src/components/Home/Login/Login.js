import { React, Component } from 'react';
import './Login.css';

class Login extends Component {
    constructor(){
        super();
    }
    render(){
        const exitLogin = () => {
            document.getElementById(`container-login`).style.display = 'none';
            document.getElementById(`container-login`).style.opacity = 0;
            document.getElementById(`formAuth-login`).style.display = 'none';
        }
        const login = async(e) => {
            e.preventDefault();
            const usernameInput = document.getElementById("username").value;
            const passwordInput = document.getElementById("password").value;
            const fetchData = await fetch("/api/auth/login", {
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
        return(
            <div>
                <div id="container-login"></div>
                <form id="formAuth-login" onSubmit={login} autoComplete='off'>
                    <label>Login</label><br/>
                    <input type="search" placeholder="username" className="authInput" id="username"></input><br/>
                    <input placeholder='password' className="authInput" id="password" type="password"></input><br/>
                    <input type="submit" id='login-submit' value='Login'></input>
                    <h1 id="exit-login" onClick={exitLogin}>X</h1>
                </form>
            </div>
        )
    }
}

export default Login;