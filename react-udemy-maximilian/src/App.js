import React, { Component } from 'react';
import styles from './App.module.css';
//./ means relative path
//should use PascalCase becos elements with lower case are reserved for html elements
//can create Div component  
import Persons from './Persons/Persons'
import Cockpit from './Cockpit/Cockpit'
import withClass from './WithClass'
import AuthContext from './auth-context';

//function App() {
class App extends Component {
  constructor(props) {
    super(props);
    console.log("App.js constructor");
  }

  static getDerivedStateFromProps(props, state) {
    console.log("App.js getDerivedStateFromProps", props);
    return state;
  }

  componentDidMount() {
    console.log('App.js componentDidMount')
  }

  shouldComponentUpdate() {
    console.log('App.js shouldComponentUpdate');
    return true;
  }

  componentDidUpdate() {
    console.log('App.js componentDidUpdate');
  }

  //modern syntax which addds constructor, call super(props) and set state in constructor)
  state = {
    persons: [
      { id: 1, name: "Alex", age: 28 },
      { id: 2, name: "Bingo", age: 29 },
      { id: 3, name: "Charles", age: 30 },
    ],
    showPersons: false,
    showCockpit: true,
    otherState: "some other value",
    changeCounter: 0,
    authenticated: false,
  }
  //state managed inside component, available when extend component
  //React 16.8 react hooks

  //40
  //handler indicate this method is not actively being called and is an event handler
  //don't do this.switchNameHandler(), it would be executed
  //this.switchNameHandler is passing reference
  //without arrow function, this will not refer to this class at runtime and cannot reach state property

  deletePersonHandler = (personIndex) => {
    //get pointer to the original persons managed by react
    //splice mutates the original data, unpredictable effect
    //create copy of array before manipulating it
    //const persons = this.state.persons.slice();
    const persons = [...this.state.persons];
    persons.splice(personIndex, 1);
    this.setState({ persons: persons });
  }

  //53
  //assign arrow function to property
  //ensure this keyword inside this method returns to this class
  togglePersonsHandler = () => {
    const show = this.state.showPersons;
    this.setState({ 
      showPersons: !show
    });
  }

  //two-way binding
  changeNameHandler = (event, id) => {
    const personIndex = this.state.persons.findIndex(p => p.id == id);
    
    //js objects are reference types
    //const person = this.state.persons[personIndex];

    //const person = Object.assign({}, this.state.persons[personIndex]);

    const person = {
      ...this.state.persons[personIndex]
    };

    person.name = event.target.value;

    const persons = [...this.state.persons];
    persons[personIndex] = person;

    this.setState((prevState, props) => { 
      return {
        persons: persons,
        changeCounter: prevState.changeCounter + 1,
      }
    });
  }

  loginHandler = () => {
    this.setState({authenticated: true});
  }

  //() => this.switchNameHandler()
  //arrow function with no arguments which returns function call
  //pass anonymous function which will be executed on click then returns result of the function being executed
  //convenient but inefficent as it can re-render certain things too often
  render() {
    console.log("App.js render");

    let persons = null;

    if(this.state.showPersons) {
      persons = (
        <div>
          <Persons persons={this.state.persons}
            clicked={this.deletePersonHandler}
            changed={this.changeNameHandler} 
            isAuthenticated={this.state.authenticated}   
          />
        </div>
      )
    }

    return (
        <div className={styles.App}>
          <button onClick={() => {
            this.setState({showCockpit: !this.state.showCockpit});
          }}>Toggle Cockpit</button>
          <AuthContext.Provider value={{
            authenticated: this.state.authenticated, 
            login: this.loginHandler
          }}>
            {this.state.showCockpit ? 
              <Cockpit appTitle={this.props.appTitle}
                showPersons={this.state.showPersons}
                personsLength={this.state.persons.length}
                clicked={this.togglePersonsHandler}
              /> : null}
            {persons}
          </AuthContext.Provider>
        </div>
      );
    }

  //30 understanding jsx
  //above is jsx compiled to below and thus import React is needed
  //return React.createElement('div', { className: 'App' }, React.createElement('h1', null, 'Does this work now?'));
  
  //31 jsx restrictions
  //class is reserved word, React defines className
  //1 root element, in React 16 this rule is relaxed
}

//higher order component
export default withClass(App, styles.App);
