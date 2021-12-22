import { Component } from 'react';
import { BrowserRouter as Router, Route ,Link, Routes} from "react-router-dom";
import './Home.css';
import Nav from '../Nav/Nav';
import Login from '../Nav/Login/Login';
import Register from '../Nav/Register/Register';

class Home extends Component {
  constructor(){
    super();
    this.state = {
      loggedIn: "loading"
    }
    this.checkLogin = this.checkLogin.bind(this)
  }
  async checkLogin() {
    //get data to see if user is logged in
    const fetchLogin = await fetch("/api/auth/isLoggedIn");
    const fetchLoginJSON = await fetchLogin.json();
    
    //change state if user is logged in or out
    fetchLoginJSON.loggedIn === "false" ? this.setState({loggedIn: "false"}) : this.setState({loggedIn: "true"});
  }
  async componentDidMount() {
    this.checkLogin();
  }
  render(){
    //check if user is logged in, logged out or loading...
    return(
      this.state.loggedIn === "true" ? 
        <div>
          <Nav loggedIn="true" />
          <Login />
          <Register />
        </div>: 

      this.state.loggedIn === "false" ? 
        <div>
          <Nav loggedIn="false" />
          <h1 className='explanation'>Messaging<br/>&<br/>Video Calling</h1>
          <Login />
          <Register />
        </div>:

      <div>
        <h1 id="loading">Loading...</h1>
      </div>
    )
  }
}

export default Home;
