import { Component } from 'react';
import { BrowserRouter as Router, Route ,Link, Routes} from "react-router-dom";
import './Home.css';
import Nav from '../Nav/Nav';
import Login from './Login/Login';
import Register from './Register/Register';

class Home extends Component {
  constructor(){
    super();
    this.state = {
      loggedIn: "loading"
    }
  }
  render(){
    const checkLogin = async() => {
      //get data to see if user is logged in
      const fetchLogin = await fetch("/api/auth/isLoggedIn");
      const fetchLoginJSON = await fetchLogin.json();

      //change state if user is logged in or out
      fetchLoginJSON.loggedIn === "false" && this.setState({loggedIn: "false"});
      fetchLoginJSON.loggedIn === "true" && this.setState({loggedIn: "true"});
    }

    //run checkLogin() if we havent checked yet
    this.state.loggedIn === "loading" && checkLogin();

    //iser is logged in
    if(this.state.loggedIn === "true"){
      return (
        <div>
          <Nav loggedIn="true" />
          <Login />
          <Register />
        </div>
      );
    }

    //user is not logged in
    if(this.state.loggedIn === "false"){
      return (
        <div>
          <Nav loggedIn="false" />
          <h1 className='explanation'>Messaging<br/>&<br/>Video Calling</h1>
          <Login />
          <Register />
        </div>
      )
    }

    //still waiting for res
    return(
      <div>
        <h1 id="loading">Loading...</h1>
      </div>
    ) 
  }
}

export default Home;
