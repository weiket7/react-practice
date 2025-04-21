import React, { Component } from 'react';
import Person from './Person/Person'

class Persons extends Component {
    //warning:  `Persons` uses `getDerivedStateFromProps` but its initial state is undefined. This is not recommended. Instead, define the initial state by assigning an object to `this.state` in the constructor of `Persons`. This ensures that `getDerivedStateFromProps` arguments have a consistent shape.
    //uninitialised state thus the warning
    //part of creation lifecycle
    //static getDerivedStateFromProps(props, state) {
        //console.log('Persons.js getDerivedStateFromProps');
        //return state;
    //}

    shouldComponentUpdate(nextProps, nextState) {
        console.log('Persons.js shouldComponentUpdate');
        return true;
        //Persons.js get re-rendered when something in App.js changes
        //becos Persons is a child component of App.js
        //toggle Persons, remove cockpit
        //console has Persons.js shouldComponentUpdate, Persons rendering, Person rendering x 3
        
        //for remove cockpit, did not go through entire Persons tree to re-render virtually
        //persons is array which is a reference type, this is comparing the pointer
        //App.js does create new copy of persons object
        if(nextProps.persons !== this.props.persons ||
            nextProps.changed !== this.props.changed ||
            nextProps.clicked !== this.props.clicked ||
            nextProps.isAuthenticated !== this.props.isAuthenticated
            ) { //check what changed
            return true; //continue update
        } else {
            return false;
        }
    }

    getSnapshotBeforeUpdate(prevProps, prevState) {
        console.log('Persons.js shouldComponentUpdate');
        //use snapshot to save some data before update then use it after update
        return { message: 'Snapshot!'};
    }

    //runs when type something in person 
    //Person changed -> Persons changed -> App update state -> pass back into Persons
    //used often
    componentDidUpdate(prevProps, prevState, snapshot) {
        console.log('Persons.js componentDidUpdate');
        console.log(snapshot);
    }

    componentWillUnmount() {
        console.log('Persons.js componentWillUnmount')
    }

    render() {
        console.log('Persons.js rendering');
        
        return this.props.persons.map((person, index) => {
            return <Person 
                click={() => this.props.clicked(index)}
                changed={(event) => this.props.changed(event, person.id)}
                name={person.name} age={person.age} key={person.id}
                isAuth={this.props.isAuthenticated}  
                />
            })
    }
}

export default Persons;