import React from 'react';
import handleFormSubmission from './handleFormSubmission';
import handleFormClose from './handleFormClose';
import Input from './input/Input';
import './Form.css';

const Form = (props) => {
    return(
        <form className='form' onSubmit={handleFormSubmission} id={props.label}>
            <label>{props.label}</label>
            <h1 className='exit' id={props.label} onClick={handleFormClose} >X</h1>
            {props.inputs.map((currentInput, i) => (<Input placeholder={currentInput.placeholder} type="search" key={i} />))}
            <Input value={props.label} type="submit" />
        </form>
    )
}

export default Form;