import { Component } from 'react';
import { BrowserRouter as Router, Route ,Link, Routes} from "react-router-dom";
import './Home.css';
import Nav from '../Nav/Nav';

class Home extends Component {
  constructor(){
    super();
    this.state = {
      loggedIn: "loading"
    }
  }
  render(){
    const checkLogin = async() => {
      const fetchLogin = await fetch("/api/auth/isLoggedIn");
      const fetchLoginJSON = await fetchLogin.json();

      if(fetchLoginJSON.loggedIn === "true"){
        this.setState({loggedIn: "true"});
      }
      
      if(fetchLoginJSON.loggedIn === "false"){
        this.setState({loggedIn: "false"});
      }
    }

    if(this.state.loggedIn === "loading"){
      checkLogin();
    }

    if(this.state.loggedIn === "true"){
      return (
        <div>
          <Nav loggedIn="true" />
        </div>
      );
    }

    if(this.state.loggedIn === "false"){
      return (
        <div>
          <Nav loggedIn="false" />
          <h1 className='explanation'>Messaging<br/>&<br/>Video Calling</h1>
        </div>
      )
    }

    return(
      <div>
        <h1 id="loading">Loading...</h1>
      </div>
    ) 
  }
}

export default Home;
