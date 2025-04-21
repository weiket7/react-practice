import React from 'react';
import classes from './Person.module.css'
//component is a function which returns jsx

const person = (props) => {
    //<input type="text" onChange={props.changed} value={props.name}/>
    //warning - You provided a value prop to a form field without onChange handler
    //false alarm becos this warning is for other inputs

    //<input type="text" value={props.name}/>
    //value prop without onchange handler, binding value to a property without allowing reaction to changes and it would lock input down
    //can't type, not handling changes, always overwrite what we're trying to type with existing value 

    //returns react component
    
    return (
        <div className={classes.Person}>
            <p onClick={props.click}>I am {props.name} and I am {props.age} years old!</p>
            <p>{props.children}</p>
            <input type="text" onChange={props.changed} value={props.name}/>
        </div>
    )
}

export default person;