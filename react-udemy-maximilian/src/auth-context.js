import React from 'react';

//React.createContext() initialise context with default value
//object which can be passed between components without props
//wrap all components which need the context
//default values apply when they're not set
const authContext = React.createContext({
    authenticated: false, 
    login: () => {} //anonymous function
});

export default authContext;