import React, { useEffect } from 'react';
import './App.css';

//main component name must be capitalised
function App() {
    return (
        <div className="App">
            <h1>Hi, I'm a React App</h1>
        </div>        
    )
}

export default App;

/*30 understanding jsx-----*/

import React, { Component } from 'react';
import './App.css';

class App extends Component {
  
  //31 jsx restrictions
  //class is reserved word, React defines className
  //1 root element, in React 16 this rule is relaxed
  render() {
    return (
        <div className="App">
            <h1>Hi, I'm a React App</h1>
        </div>        
    )
  }

  //above is jsx compiled to below and thus import React is needed
  //return React.createElement('div', { className: 'App' }, React.createElement('h1', null, 'Does this work now?'));
}

export default App;

/*-----32 functional component-----*/

//./ means relative path
//should use PascalCase becos lower case is reserved for html elements
//this means can create Div component  
import Person from './Person/Person'

/*-----40-42 handling events with methods, changing state-----*/
    //React hooks available from React 16.8 and onwards, it is optional

  //state managed inside component, available when extend component
  state = {
    persons: [
      { name: "Max", age: 28 },
      { name: "Manu", age: 29 },
    ],
    otherState: "some other value"
  }

    //handler indicate this method is not actively being called and is an event handler
    //don't do <button onClick={this.switchNameHandler()}/>, it would be executed when page load
    //this.switchNameHandler is passing reference
 
    //without arrow function, this will not refer to this class at runtime and cannot reach state property
    const switchNameHandler = () => {
        //below does not work
        //this.state.persons[0].name = 'Maxmilian';

        //42
        //React will look at the state and look at what changed
        //other values will remain 
        setPersonsState({ 
            persons: [
            { name: "Maximilian", age: 41 },
            { name: "Manu", age: 42 },
            ]}
        );
    }

    //jsx is onClick, normal javascript is onclick
    <button onClick={this.switchNameHandler}>Switch Name</button>


/*-----44 useState() hook-----*/
const App = props => {
    //array destructuring
    const [ personsState, setPersonsState ] = useState({
        persons: [
        { name: "Max", age: 28 },
        { name: "Manu", age: 29 },
        ],
    })

    //multiple useState
    const [otherState, setOtherState] = useState("some other value");

    useEffect(() => {
        console.log(personsState, otherState);
    })

    const switchNameHandler = () => {
        setPersonsState({ 
            persons: [
            { name: "Maximilian", age: 41 },
            { name: "Manu", age: 42 },
            ],
        },
        );
    }
}

/*-----45 useState() hook-----*/
//stateful - also called smart / container components
//have more stateless components
//less stateful components - clear flow of data, where logic is
//if every component manage own state, might have spaghetti code

/*46 pass method reference*/
//two ways
//this.switchNameHandler.bind(this, 'Maximilian')

//() => this.switchNameHandler()
//arrow function with no arguments which returns function call
//pass anonymous function which will be executed on click then returns result of the function being executed
//convenient but inefficent as it can re-render certain things too often

/*-----47 two-way binding-----*/
changeNameHandler = (event) => {
    this.setState({ 
      persons: [
        { name: 'Maxmilian', age: 41 },
        { name: event.target.value, age: 42 },
      ]}
    );
  }

<Person name={this.state.persons[1].name} age={this.state.persons[1].age}
    click={this.switchNameHandler.bind(this, 'Max!')}
    changed={this.changeNameHandler}>
    My Hobbies: Racing
    </Person>

const person = (props) => {
    //<input type="text" onChange={props.changed} value={props.name}/>
    //warning - You provided a value prop to a form field without onChange handler
    //false alarm becos this warning is for other inputs

    //<input type="text" value={props.name}/>
    //value prop without onchange handler, binding value to a property without allowing reaction to changes and it would lock input down
    //can't type, not handling changes, always overwrite what we're trying to type with existing value 
    return (
        <div >
            <p onClick={props.click}>I am {props.name} and I am {props.age} years old!</p>
            <p>{props.children}</p>
            <input type="text" onChange={props.changed} value={props.name}/>
        </div>
    )
}

/*-----48 adding styling with stylesheets-----*/
//webpack imports css
//auto-prefix to work in as many browsers as possible
//inline stylesheets

//font: inherit - use surrounding fonts
//scoped to component
//difficult to style effects like hover
const buttonStyle = {
    backgroundColor: 'white',
    font: 'inherit',
    border: '1px solid blue',
    padding: '8px',
    cursor: 'pointer'
}

/*-----53 conditions----*/

//problems with this keyword
togglePersonsHandler() {

}

//assign arrow function to property
//ensure this keyword inside this method returns to this class
//53
//assign arrow function to property
//ensure this keyword inside this method returns to this class
togglePersonsHandler = () => {
const show = this.state.showPersons;
this.setState({ 
    showPersons: !show
});
}

//54 handling dynamic content
//when react updates the screen, it executes the render method and everything inside
if(this.state.showPersons) {
    persons = (
      <div>
        <Person name={this.state.persons[0].name} age={this.state.persons[0].age}/>
        <Person name={this.state.persons[1].name} age={this.state.persons[1].age}
          click={this.switchNameHandler.bind(this, 'Max!')}
          changed={this.changeNameHandler}>
          My Hobbies: Racing
        </Person>
      </div>
    )
  }

  { this.state.showPersons ? persons : null}

//56
//Warning: Each child in a list should have a unique "key" prop.
if(this.state.showPersons) {
    persons = (
      <div>
        {this.state.persons.map(person => {
          return <Person name={person.name} age={person.age}/>
        })}
      </div>
    )
  }


//57
deletePersonHandler = (personIndex) => {
    const persons = this.state.persons;
    persons.splice(personIndex, 1);
    this.setState({ persons: persons });
  }

  if(this.state.showPersons) {
    persons = (
      <div>
        {this.state.persons.map((person, index) => {
          return <Person click={() => this.deletePersonHandler(index)} name={person.name} age={person.age}/>
        })}
      </div>
    )
  }

//58
//get pointer to the original persons managed by react
//splice mutates the original data, unpredictable effect
//create copy of array before manipulating it
const persons = this.state.persons.slice();
const persons = [...this.state.persons];

/*-----59 lists and keys----*/
//default property React expects on custom component or default html rendered by mapping array through jsx elements
//behind the scenes, React needs to know what it needs to adjust in the DOM
//by default it re-render whole list
//having key property it can compare and find what changed
//index is part of the list, if the list changes, every element after the change will have new index


/*-----60 flexible lists----*/
//this function is the one which gets executed on onchange event
//then the event and person.id can be used in changeNameHandler
changed={(event) => this.changeNameHandler(event, person.id)}

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

    this.setState({ 
      persons: persons
    });
  }


/*66*/
buttonStyle.backgroundColor = 'red';

/*67*/
const classes = ['red', 'bold'].join(' ');

/*68 radium*/
//--save  save an entry in package.json to fix version

//higher order component
//component wrapping component and adding additional functionality and syntax
export default Radium(App);
const buttonStyle = {
    ':hover': {
      backgroundColor: 'lightgreen',
      color: 'black'
    }
  }

//69 using Radium for media queries
//For transforming selectors like media queries or animations like key frames
//Need to wrap entire application in StyleRoot provided by Radium
const style = {
  '@media (min-width: 500px)': {
      width: '450px'
  }
}

import Radium, { StyleRoot } from 'radium';
import { render } from '@testing-library/react';

return (
  <StyleRoot>
    <div className="App">

    </div>
  </StyleRoot>
);

//70 styled components
//`` is tagged template
//text within ` ` is passed into button function on style object
//returns react component
//adds them to head

//disadvantages:
//difficult to add id to elements
//difficult to reproduce bug
//cannot change css in browser devtools
//poor intellisense
//bloats js with css
//css names keep changing
//difficult to work with UI designer who writes css
const StyledDiv = styled.div`
      width: 60%;
      margin: auto;
      border: 1px  solid #eee;
      box-shadow: 0 2px 3px #ccc;
      padding: 16px;
      text-align: center;

      @media(min-width: 500px) {
          width: 450px;
      }
  `;

//71, 72
//& means hover belongs to this button
const StyledButton = styled.button`
  background-color: ${props => props.isShow ? 'red' : 'green'};
  font: inherit;
  border: 1px solid blue;
  padding: 8px;
  cursor: pointer;
  &:hover {
    background-color: ${props => props.isShow ? 'salmon' : 'lightgreen'};
    color: black
  }
`;

<StyledButton isShow={this.state.showPersons}

//73
//css modules work in react scripts >=2.0 by having App.module.css
//import styles from './App.module.css';
//scope css to files which import it

//79
//Chrome sources
//generated source maps allow browser devtools to go into code and debug that code although code shipped to browser is optimised

//80
react dev tools
//log component to console
//inspect matching dom element
//inspect source code

//81 react boundaries
//throw new Error('')
//React 16+
//use when we know it might fail and can't control it

//87
//stateful - state in class or useState, container components
//presentation - stateless, function component which does not manage state (eg Cockpit.js) although it can
//state change in couple of stateful components, predictable flow of data, have a lot of presentation components which are re-useable

//88 class-based vs functional components
//class XY extends Component
//access to state, lifecycle hooks

//functional
//before 16.8 could not manage state, can manage state with 16.8 react hooks
//no lifecycle hooks

ReactDOM.render(
  <React.StrictMode>
    <App appTitle="Personal Manager"/>
  </React.StrictMode>,
  document.getElementById('root')
);

<Cockpit title={this.props.appTitle} />

//89
//1. constructor
//set up state 
//don't cause side effects like send http request, store in local storage, send to GA, which can cause unnecessary renders and impact performance

//2. getDerivedStateFromProps(props, state)
//sync state, don't cause side effects
//rarely used

//3. render

//4. render child components
//5. componentDidMount
//cause side effects
//don't update state as it triggers re-render

//90
//modern syntax which addds constructor, call super(props) and set state in constructor)
state = {
  persons: [
    { id: 1, name: "Alex", age: 28 },
    { id: 2, name: "Bingo", age: 29 },
    { id: 3, name: "Charles", age: 30 },
  ],
  showPersons: false,
  otherState: "some other value"
}

// https://github.com/facebook/react/issues/15074
//Question: If wrapped in React.StrictMode and a function component contains a call to useState, the function (render) is called twice - even if the state setter is never called.
//Answer: It's an intentional feature of the StrictMode. This only happens in development, and helps find accidental side effects put 
//into the render phase. We only do this for components with Hooks because those are more likely to accidentally have side 
//effects in the wrong place.

//click button
//getDerivedStateFromPros
//App.js render
//Person.js render

//91 Component Updat Lifecycle (for props changes)
//getDerivedStateFromProps(props, state)
//sync state to props, initialise state of component that updates based on props it's getting
//eg form control

//shouldComponentUpdate(nextProps, nextState)
//decide whether to continue or not
//can cancel updating process

//render()

//update child component props

//getSnapshotBeforeUpdate(prevProps, prevState)
//niche lifecycle hook, eg get scrolling position before update happens and scroll user back after update

//componentDidUpdate()
//done with updating
//make http request, take note not to cause infinite loop

//92 
//App.js
shouldComponentUpdate() {
  console.log('App.js shouldComponentUpdate');
  return false; //prevent update
  return true; //default
}

componentDidUpdate() {
  console.log('App.js componentDidUpdate');
}

//componentDidMount, shouldComponentUpdate, componentDidUpdate used often
//componentDidMount, componentDidUpdate for fetching data
//shouldComponentUpdate for performance improvement


//94 useEffect
//with react hook, can build entire app using functional components only
//React Hook "useEffect" is called in function "cockpit" which is neither a React function component or a custom React Hook function  react-hooks/rules-of-hooks
//Cockpit, not cockpit

//combine functionalities of all lifecycle hooks into a React hook useEffect
//pass in a function
//executed for every render including when component is created
//componentDidMount and componentDidUpdate combined
  useEffect(() => {
    console.log('Cockpit.js useEffect');

    setTimeout(() => {
        //run when first render, click button, type, delete person
        alert('Saved data to cloud');
    }, 1000)
  }, [props.persons])
//run only when persons change
//no alert when click button
//pass in empty array, similar to componentDidMount, run only during first render

//95
//below runs all the time first load, toggle persons, type name, delete person except hide cockpit
useEffect(() => {
  console.log('Cockpit.js useEffect');
})

//below runs on first render only
//componentDidMount
//[] means no dependencies and won't re-run
useEffect(() => {
  console.log('Cockpit.js useEffect');
}, [])

//below runs on first render and every update on Persons like type name and delete person
//not on toggle persons
useEffect(() => {
  console.log('Cockpit.js useEffect');
}, [props.persons])

//when component is rendered and unmounted
//return () => {} similar to componentDidUnmount
useEffect(() => {
  console.log('Cockpit.js useEffect');
  return () => {
    console.log("%cCockpit.js cleanup work in useEffect")
  }
}, [])

//for some operation which should be cancelled when component re-render
useEffect(() => {
  console.log("%cCockpit.js 2nd useEffect", 'color: green')
  return () => {
      console.log("%cCockpit.js 2nd cleanup work in useEffect", 'color: green');
  }
})

//96 cleanup work with useEffect()
//
useEffect(() => {
  console.log('Cockpit.js useEffect');

  const timer = setTimeout(() => {
      //run when first render, click button, type, delete person
      alert('Saved data to cloud');
  }, 1000)

  //run after every render cycle
  //run before main useEffect functions run, but after first render cycle
  return () => {
      clearTimeout(timer);
      console.log("Cockpit.js cleanup work in useEffect")
  }
}, [])

//97 Using shouldComponentUpdate for optimisation
shouldComponentUpdate(nextProps, nextState) {
  console.log('Persons.js shouldComponentUpdate');
  //Persons.js get re-rendered when something in App.js changes
  //becos Persons is a child component of App.js
  //toggle Persons, remove cockpit
  //console has Persons.js shouldComponentUpdate, Persons rendering, Person rendering x 3
  
  //for remove cockpit, did not go through entire Persons tree to re-render virtually
  //persons is array which is a reference type, this is comparing the pointer
  //App.js does create new copy of persons object
  if(nextProps.persons !== this.props.persons) { //check what changed
      return true; //continue update
  } else {
      return false;
  }
}
//chrome -> more tools -> rendering -> enable paint flashing

//98 optimise functional components with React.memo()
//shouldComponentUpdate only available in class components, what about function components
//memoization where React store snapshot and re-render if input change
export default React.memo(Cockpit);

if(props.personsLength <= 2) {
  assignedClasses.push(classes.red);
}
if(props.personsLength <= 1) {
  assignedClasses.push(classes.bold);
}

//App.s
{this.state.showCockpit ? <Cockpit appTitle={this.props.appTitle}
  showPersons={this.state.showPersons}
  personsLength={this.state.persons.length}
  clicked={this.togglePersonsHandler}
  /> : null}

//99
//in all or almost all cases where parent update, child component also need to update
//should not add componentShouldUpdate or React.memo

//100
//when check all properties of component
//Persons extends PureComponent
//complete props check

//102 rendering adjacent jsx elements
//return an array of elements with keys so that React can efficiently update and re-roder them
class Person extends Component {
  render() {
      console.log('Person.js rendering');

  return [
          <p key="i1" onClick={this.props.click}>I am {this.props.name} and I am {this.props.age} years old!</p>,
          <p key="i2" >{this.props.children}</p>,
          <input key="i3" type="text" onChange={this.props.changed} value={this.props.name}/>
      ]
  }
}

const aux = props => props.children;

export default aux;

//103 React.Fragment
import React, { Fragment } from 'react';

//104 Higher order components
//error handling hoc wrap around other components which send http requests
//additional styling, html elements, logic

//106
//not a component
//function which returns function component
//change html code or styling go into jsx code as wrapping component
//hoc which handle error or send analytics data should be withClass(App, classes.App);
const withClass = (WrappedComponent, className) => {
    return props => (
        <div className={className}>
            <WrappedComponent></WrappedComponent>
        </div>
    );
}

export default withClass;

//107 setting state correctly ***super important to know about React internals, might prevent bugs
//behind the scenes, setState does not immediately trigger update and re-render
//React schedules it to run when there's available resources
//call setState synchronously but it's not guaranteed to execute and finish immediately
//this.state when used for state update is not guaranteed to be latest state, might be older state

//better way to update state when depending on old state
this.setState((prevState, props) => { 
  return {
    persons: persons,
    changeCounter: prevState.changeCounter + 1,
  }
});

//109 proptypes
//npm install --save prop-types
//useful when component is distributed or when working in bigger team

//110 using refs
//Person.js
<input type="text"
  ref={(inputEl) => {this.inputElement = inputEl }}

  componentDidMount() {
    this.inputElement.focus();
   }


//react 16.3
constructor(props) {
  //when adding constructor, always add super(props)
  super(props);
  this.inputElementRef = React.createRef();
}

componentDidMount() {
    this.inputElementRef.current.focus();
}

<input type="text"
  ref={this.inputElementRef}

//111 Refs with React Hooks
//Uncaught TypeError: Cannot read property 'click' of null at Cockpit (Cockpit.js:7)
//calling click right after initialising ref, React has not executed code below to assign ref to button
//when togglebtnRef.current.click(); is executed, button is undefined
const Cockpit = (props) => {
  const togglebtnRef = useRef(null);

  togglebtnRef.current.click();

<button 
  ref={toggleBtnRef}

//fix using useEffect, code runs after jsx code has run


//112 understanding prop chain problems
//pass props across multiple levels
//Persons component only forwards isAuthenticated
//Persons is less re-usable, isAuthenticated has to be passed in

//113 Context API
//pass props from A to D when B and C don't need it
//App.js
<AuthContext.Provider value={{
  authenticated: this.state.authenticated, 
  login: this.loginHandler
}}></AuthContext.Provider>

//Person.js
//AuthContext.Consumer executes function between opening and closing tag
        //function will get context object
      return <AuthContext.Consumer>
        {(context) => 
            context.authenticated ? <p>Authenticated!</p> : <p>Please log in</p>
        }
    </AuthContext.Consumer>

//when use wrong property from context, no error/warning

//114
//connect this component to context
//for class components
static contextType = AuthContext;

componentDidMount() {
  console.log(this.context.authenticated);
}

{ this.context.authenticated ? <p>Authenticated!</p> : <p>Please log in</p> }


//for functional components
const authContext = useContext(AuthContext);