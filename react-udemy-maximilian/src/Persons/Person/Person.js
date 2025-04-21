import React, { Component } from 'react';
import classes from './Person.module.css'
import Aux from '../../Auxiliary';
import withClass from '../../WithClass'
//component is a function which returns jsx
import PropTypes from 'prop-types';
import AuthContext from '../../auth-context';

class Person extends Component {
    constructor(props) {
        //when adding constructor, always add super(props)
        super(props);
        //React 16.3
        this.inputElementRef = React.createRef();
    }

    //connect this component to context
    static contextType = AuthContext;

    componentDidMount() {
        //works only in class components
        //this.inputElement.focus();
        console.log('%c' + this.props.isAuth, 'color: red')

        this.inputElementRef.current.focus();

        console.log(this.context.authenticated);
    }

    render() {
        console.log('Person.js rendering');

        //in class based components, props are accessed with this as they're props of this component
        return (
            <Aux>
                { this.context.authenticated ? <p>Authenticated!</p> : <p>Please log in</p> }
                <p onClick={this.props.click}>I am {this.props.name} and I am {this.props.age} years old!</p>
                <p>{this.props.children}</p>
                <input type="text"
                    //ref={(inputEl) => {this.inputElement = inputEl }}
                    ref={this.inputElementRef}
                    onChange={this.props.changed}
                    value={this.props.name}/>
            </Aux>
        )
    }

    // return (
    //     <Aux>
    //         <p onClick={this.props.click}>I am {this.props.name} and I am {this.props.age} years old!</p>
    //         <p>{this.props.children}</p>
    //         <input type="text" onChange={this.props.changed} value={this.props.name}/>
    //     </Aux>
    // )

    ////return an array of elements with keys so that React can efficiently update and re-roder them
    // return [
    //         <p key="i1" onClick={this.props.click}>I am {this.props.name} and I am {this.props.age} years old!</p>,
    //         <p key="i2" >{this.props.children}</p>,
    //         <input key="i3" type="text" onChange={this.props.changed} value={this.props.name}/>
    //     ]
    // }
}

Person.propTypes = {
    click: PropTypes.func,
    name: PropTypes.string,
    age: PropTypes.number,
    changed: PropTypes.func,
}

export default withClass(Person, classes.Person);