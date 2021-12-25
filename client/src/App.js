import { Component } from 'react';
import { BrowserRouter as Router, Route ,Link, Routes} from "react-router-dom";
import './App.css';
import Home from './components/Home/Home';
import Login from './components/Nav/Login/Login';
import Register from './components/Nav/Register/Register';
import Chat from './components/Chat/Chat';

class App extends Component {
  constructor(){
    super();
    this.state = {
      loggedIn: "loading",
      username: ""
    }
    this.checkLogin = this.checkLogin.bind(this);
  }
  async checkLogin() {
    //get data to see if user is logged in
    const fetchLogin = await fetch("/api/auth/isLoggedIn");
    const fetchLoginJSON = await fetchLogin.json();
    
    //change state if user is logged in or out
    fetchLoginJSON.loggedIn === "false" ? this.setState({loggedIn: "false"}) : this.setState({loggedIn: "true"});
    fetchLoginJSON.username && this.setState({username: fetchLoginJSON.username});
    console.log(this.state.username + " is username")
  }
  async componentDidMount() {
    this.checkLogin();
  }
  render(){
    return(
      <Router>
        <Routes>
          <Route exact path="/" element={<Home />}></Route>
          <Route exact path="/auth/register" element={<Register />}></Route>
          <Route exact path="/auth/login" element={<Login />}></Route>
          <Route exact path="/chat/:name" element={<Chat  loggedIn={this.state.loggedIn} username={this.state.username} />}></Route>
        </Routes>
      </Router>
    )
  }
}

export default App;
