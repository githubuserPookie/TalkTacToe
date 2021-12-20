import { Component } from 'react';
import { BrowserRouter as Router, Route ,Link, Routes} from "react-router-dom";
import './App.css';
import Home from './Home/Home';
import Login from './Home/Login/Login';
import Register from './Home/Register/Register';

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
        </Routes>
      </Router>
    )
  }
}

export default App;
