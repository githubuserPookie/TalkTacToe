import React from 'react';
import './Input.css';

const Input = (props) => {
    return(
        <div>
            <br/>
            <input className="input" placeholder={props.placeholder} type={props.type}></input>
        </div>
    )
}

export default Input;