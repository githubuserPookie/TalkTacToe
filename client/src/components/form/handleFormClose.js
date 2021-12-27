import React from 'react';

const handleFormClose = (event) => {
    //event.target.id = form id
    document.getElementById(event.target.id).style.display = "none";
}

export default handleFormClose;