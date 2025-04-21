import React from 'react';
import classes from './DrawerToggle.module.css'

const drawerToggle = (props) => (
    //hold reference to the method which should get executed on click
    <div onClick={props.clicked} className={classes.DrawerToggle}>
        <div></div>
        <div></div>
        <div></div>
    </div>
)

export default drawerToggle;