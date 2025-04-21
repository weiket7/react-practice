import React from 'react';

//not a component
//function which returns function component
//change html code or styling go into jsx code as wrapping component
//hoc which handle error or send analytics data should be withClass(App, classes.App);

const withClass = (WrappedComponent, className) => {
    return props => (
        <div className={className}>
            <WrappedComponent {...props}></WrappedComponent>
        </div>
    );
}

export default withClass;