import React, { Component} from 'react'
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary'
import { Route, Redirect } from 'react-router-dom';
import ContactData from './ContactData/ContactData'
import { connect } from 'react-redux';
//import * as actions from '../../store/actions/index'

class Checkout extends Component {

    state = {
        ingredients: null,
        price: 0,
    }

    checkoutCancelledHandler = () => {
        this.props.history.goBack();
    }

    checkoutContinuedHandler = () => {
        this.props.history.replace("/checkout/contact-data");
    }

    render() {
        let summary = <Redirect to="/"/>
        if(this.props.ings) {
            const purchasedRedirect = this.props.purchased ? <Redirect to="/" /> : null;
            summary = (
                <div>
                    {purchasedRedirect}
                    <CheckoutSummary ingredients={this.props.ings}
                        checkoutCancelled={this.checkoutCancelledHandler}
                        checkoutContinued={this.checkoutContinuedHandler}
                    ></CheckoutSummary>
                    <Route path={this.props.match.path + '/contact-data'}
                        component={ContactData} />
                </div>
            )
        }

        return summary;
    }
} 

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        purchased: state.order.purchased,
    }
}

//export default connect(null, mapDispatchToProps)(Checkout);
export default connect(mapStateToProps)(Checkout);