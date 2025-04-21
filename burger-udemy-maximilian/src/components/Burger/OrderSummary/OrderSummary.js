import React, { Component } from 'react';
import Aux from '../../../hoc/Auxiliary'
import Button from '../../UI/Button/Button';

class OrderSummary extends Component {
    componentDidUpdate() {
        console.log('OrderSummary will update')
    }

    render() {
        const ingredientSummary = Object.keys(this.props.ingredients)
        .map(key => {
            return <li key={key}>
                <span style={{textTransform: 'capitalize'}}>{key}</span>: {this.props.ingredients[key]}
                </li>
        });

        return (
            <Aux>
                <h3>Your Order</h3>
                <p>A delicious burger with the following ingredients:</p>
                <ul>
                    {ingredientSummary}
                </ul>
                <p><strong>Total Price: {this.props.price.toFixed(2)}</strong></p>
                <p>Continue to checkout?</p>
                <Button clicked={this.props.purchaseCancelled} btnType="Danger">Cancel</Button>
                <Button clicked={this.props.purchaseContinued} btnType="Success">Continue</Button>
            </Aux>   
        )
    }
}

export default OrderSummary;