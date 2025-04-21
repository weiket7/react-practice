import React, { Component } from 'react';
import Layout from './components/Layout/Layout'
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder'
//import Checkout from './containers/Checkout/Checkout'
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
//import Orders from './containers/Orders/Orders'
//import Auth from './containers/Auth/Auth'
import Logout from './containers/Auth/Logout'
import { connect } from 'react-redux'
import * as actions from './store/actions/index'
import asyncComponent from './hoc/asyncComponent'

const asyncCheckout = asyncComponent(() => {
  return import('./containers/Checkout/Checkout');
})

const asyncOrders = asyncComponent(() => {
  return import('./containers/Orders/Orders');
})

const asyncAuth = asyncComponent(() => {
  return import('./containers/Auth/Auth');
})

class App extends Component {
  componentDidMount() {
    this.props.onTryAutoSignUp();
  }

  render() {
    let routes = (
      <Switch>
        <Route path="/auth" component={asyncAuth} />
        <Route path="/" exact component={BurgerBuilder} />
        <Redirect to="/"></Redirect>
      </Switch>
    )

    if(this.props.isAuthenticated) {
      routes = (
        <Switch>
            <Route path="/checkout" component={asyncCheckout} />
            <Route path="/orders" exact component={asyncOrders} />
            <Route path="/logout" component={Logout} />
            <Route path="/auth" component={asyncAuth} />
            <Route path="/" exact component={BurgerBuilder} />
            <Redirect to="/"></Redirect>
          </Switch>
      )
    }

    return (
      <div>
        <Layout>
          {routes}
        </Layout>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.token !== null
})

const mapDispatchToProps = dispatch => ({
  onTryAutoSignUp: () => dispatch(actions.authCheckState()),
})

//need withRouter, otherwise  App container wrapped with connect, breaks react router
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));