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
      loggedIn: "loading"
    }
  }
  render(){
    return(
      <Router>
        <Routes>
          <Route exact path="/" element={<Home />}></Route>
          <Route exact path="/auth/register" element={<Register />}></Route>
          <Route exact path="/auth/login" element={<Login />}></Route>
          <Route exact path="/chat/:name" element={<Chat />}></Route>
        </Routes>
      </Router>
    )
  }
}

export default App;
