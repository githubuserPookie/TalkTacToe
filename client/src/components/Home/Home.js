import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route ,Link, Routes} from "react-router-dom";
import './Home.css';
import Nav from '../Nav/Nav';
import Login from '../Nav/Login/Login';
import Register from '../Nav/Register/Register';
import AddFriend from '../Nav/AddFriend/AddFriend';
import Notifications from "../Nav/notifications/Notifications";
import Form from '../form/Form';

function Home(props) {
  const [isLoggedIn, setLoggedIn] = useState("loading");
  const [notificationsPrivate, setNotificationsPrivate] = useState([]);
  const [notificationsGroup, setNotificationsGroup] = useState([]);
  const [privateNames, setPrivateNames] = useState([]);
  const [groupNames, setGroupNames] = useState([]);
  const checkLogin = async() => {
    //get data to see if user is logged in
    const fetchLogin = await fetch("/api/auth/isLoggedIn");
    const fetchLoginJSON = await fetchLogin.json();

    //check for notifications
    if(fetchLoginJSON.loggedIn !== "false"){
      const invitesPrivateArr = fetchLoginJSON.invitesPrivate;
      const invitesGroupArr = fetchLoginJSON.invitesGroup;
      console.log(invitesPrivateArr + "is invites private arr")
      setNotificationsPrivate((prevMessages) => {
        const newMessages = invitesPrivateArr.map((currentInvite) => {
          console.log(currentInvite + "is current invite");
          return(`${currentInvite} wants to be your friend!`);
        });
        console.log(newMessages + "is new messages");
        return(newMessages);
      });
      setPrivateNames((prevPrivateNames) => {
        const newPrivateNames = invitesPrivateArr.map((currentInvite) => {
          return(currentInvite);
        })
        return([...prevPrivateNames, newPrivateNames])
      })
      console.log(notificationsPrivate + " a")//output is empty
      setNotificationsGroup((prevMessages) => {
        const newMessages = invitesGroupArr.map((currentInvite) => {
          return(`${currentInvite} group chat have invited you!`);
        });
        return([...prevMessages, newMessages]);
      });
    }
    //output is just a string with the elements seperated by a comma
    console.log(notificationsPrivate + "is notifcation private");
    //change state if user is logged in or out

    fetchLoginJSON.loggedIn === "false" ? setLoggedIn("false") : setLoggedIn("true");
  }
  useEffect(() => {
    checkLogin();
    console.log(notificationsPrivate)
  }, []);
    //check if user is logged in, logged out or loading...
    return(
      isLoggedIn === "true" ? 
        <div>
          <Nav loggedIn="true" />
          <Login />
          <Register />
          <AddFriend />
          <Notifications notificationsPrivate={notificationsPrivate} privateNames={privateNames} notificationsGroup={notificationsGroup} />
        </div>: 

      isLoggedIn === "false" ? 
        <div>
          {/* <Form inputs={[{placeholder: "username"}, {placeholder: "password"}]} label="login" /> */}
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
