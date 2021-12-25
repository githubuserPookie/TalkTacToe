import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route ,Link, Routes} from "react-router-dom";
import './Home.css';
import Nav from '../Nav/Nav';
import Login from '../Nav/Login/Login';
import Register from '../Nav/Register/Register';
import AddFriend from '../Nav/AddFriend/AddFriend';
import Notifications from "../Nav/notifications/Notifications";

function Home(props) {
  const [isLoggedIn, setLoggedIn] = useState("loading");
  const [notifications, setNotifications] = useState([]);
  const checkLogin = async() => {
    //get data to see if user is logged in
    const fetchLogin = await fetch("/api/auth/isLoggedIn");
    const fetchLoginJSON = await fetchLogin.json();

    //check for notifications
    if(fetchLoginJSON.loggedIn !== "false"){
      const invitesArr = fetchLoginJSON.invites;
      setNotifications((prevMessages) => {
        const newMessages = invitesArr.map((currentInvite) => {
          return(currentInvite[1] === "friend" ? `${currentInvite[0]} wants to be your friend!` : `${currentInvite[0]} group chat have invited you!`);
        });
        
        return(newMessages);
      });
    }
    //output is just a string with the elements seperated by a comma
    console.log(notifications);
    //change state if user is logged in or out

    fetchLoginJSON.loggedIn === "false" ? setLoggedIn("false") : setLoggedIn("true");
  }
  useEffect(() => {
    checkLogin();
  }, [])
    //check if user is logged in, logged out or loading...
    return(
      isLoggedIn === "true" ? 
        <div>
          <Nav loggedIn="true" />
          <Login />
          <Register />
          <AddFriend />
          <Notifications notifications={notifications} />
        </div>: 

      isLoggedIn === "false" ? 
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

export default Home;
