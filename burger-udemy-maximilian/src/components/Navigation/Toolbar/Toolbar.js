import React from 'react';
import classes from './Toolbar.module.css'
import Logo from '../../Logo/Logo'
import NavigationItems from '../NavigationItems/NavigationItems'
import DrawerToggle from '../SideDrawer/DrawerToggle'

const toolbar = props => 
<header className={classes.Toolbar}>
    <DrawerToggle clicked={props.drawerToggleClicked}/>
    <div className={classes.Logo}>
        <Logo />
    </div>
    <nav className={classes.DesktopOnly}>
        <NavigationItems isAuthenticated={props.isAuthenticated}></NavigationItems>
    </nav>
</header>

export default toolbar;