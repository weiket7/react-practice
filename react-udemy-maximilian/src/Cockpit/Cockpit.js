import React, { useEffect, useRef, useContext } from 'react';
import classes from './Cockpit.module.css'
import AuthContext from '../auth-context'

const Cockpit = (props) => {
    const toggleBtnRef = useRef();
    const authContext = useContext(AuthContext);

    console.log(authContext.authenticated);

    //combine functionalities of all lifecycle hooks into a React hook useEffect
    //pass in a function
    //executed for every render including when component is created
    //componentDidMount and componentDidUpdate combined
    useEffect(() => {
        console.log('Cockpit.js useEffect');

        // const timer = setTimeout(() => {
        //     //run when first render, click button, type, delete person
        //     alert('Saved data to cloud');
        // }, 1000)

        toggleBtnRef.current.click();

        //run after every render cycle
        //run before main useEffect functions run, but after first render cycle
        return () => {
            //clearTimeout(timer);
            console.log("Cockpit.js cleanup work in useEffect")
        }
    }, [])
    //run only when persons change
    //no alert when click button
    //pass in empty array, similar to componentDidMount

    useEffect(() => {
        console.log("%cCockpit.js 2nd useEffect", 'color: green')
        return () => {
            console.log("%cCockpit.js 2nd cleanup work in useEffect", 'color: green');
        }
    })


    const assignedClasses = [];

    let btnClass = '';

    if(props.showPersons) {
        btnClass = classes.Red;
    }

    if(props.personsLength <= 2) {
      assignedClasses.push(classes.red);
    }
    if(props.personsLength <= 1) {
      assignedClasses.push(classes.bold);
    }

    return (
        <div className={classes.Cockpit}>
            <h1>{props.appTitle}</h1>
            <p className={assignedClasses.join(' ')}>This is really working!</p>
            <button 
                ref={toggleBtnRef}
                className={btnClass} 
                onClick={props.clicked}>
            Toggle Persons</button>
            
            <button onClick={authContext.login}>Log In</button>
        </div>
    )
}

export default React.memo(Cockpit);