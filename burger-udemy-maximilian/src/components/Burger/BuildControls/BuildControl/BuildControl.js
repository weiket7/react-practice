import React from 'react';
import classes from './BuildControl.module.css';

const buildControl = (props) => (
    //onClick={props.removed}
    //pass ref to removed prop which holds ref to the method to execute
    //when button is clicked, that method is executed
    
    <div className={classes.BuildControl}>

        <div className={classes.Label}>{props.label}</div>
        
        <button className={classes.Less} 
            onClick={props.removed} 
            disabled={props.disabled}
        >Less</button>
        <button className={classes.More} onClick={props.added}>More</button>
    </div>
)

export default buildControl;