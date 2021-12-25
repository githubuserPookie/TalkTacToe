import React from 'react';
import './AddFriend.css'

function AddFriend() {
    const exitAddFriend = () => {
        document.getElementById("form-add-friend").style.display = "none";
        document.getElementById("container-add-friend").style.display = "none";
    }
    const addFriendHandler = async(event) => {
        event.preventDefault();
        try{
            const friendName = document.getElementById("add-friend-input-id").value
            const fetchData = await fetch("/api/addFriend", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    friendName: friendName
                })
            });
            
            const jsonData = await fetchData.json();
            console.log(jsonData.added + " is json data");

            const sucess = () => {
                alert("request has been sent"); 
                window.location.reload()
            };
            jsonData.added ? sucess() : alert("not found");
        }
        catch(err){
            console.log(err);
            event.preventDefault();
            alert("error has occured");
        }
    }
    return (
        <div>
            {/* <div id="container-add-friend"></div> */}
            <div id="container-add-friend">
                <form id="form-add-friend" onSubmit={addFriendHandler}>
                <label>Add Friend</label>
                <input className='add-friend-input' placeholder='Friend Username' id="add-friend-input-id"></input>
                <h1 id="exit-add-friend" onClick={exitAddFriend}>X</h1>
                <input type="submit" id='add-friend-submit' value="Add Friend"></input>
            </form>
            
            </div>
            
        </div>
        
    )
}

export default AddFriend;