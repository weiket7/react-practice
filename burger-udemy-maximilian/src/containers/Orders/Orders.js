import React, { Component } from 'react';
import { connect } from 'react-redux';
import Order from '../../components/Order/Order'
import axios from '../../axios-orders'
import withErrorHandler from '../../hoc/withErrorHandler'
import * as actions from '../../store/actions/index'
import Spinner from '../../components/UI/Spinner/Spinner'

class Orders extends Component {
    // state = {
    //     orders: [],
    //     loading: true
    // }
    
    //fetch orders only when it's mounted
    //not componentDidUpdate
    componentDidMount() {
        this.props.onFetchOrders(this.props.token, this.props.userId);
        // axios.get("/orders.json")
        //     .then(response => {
        //         const fetchedOrders = [];
        //         for(let key in response.data) {
        //             fetchedOrders.push({
        //                 ...response.data[key],
        //                 id: key
        //             });
        //         }
        //         this.setState({loading: false, orders: fetchedOrders});
        //     }).catch(error => {
        //         this.setState({loading: false});
        //     })
    }

    render() {
        let orders = <Spinner />;
        if(!this.props.loading) {
            orders = this.props.orders.map(order => (
                <Order key={order.id}
                   ingredients={order.ingredients}
                   price={order.price}
                />
            ))
        }

         return (
             <div>
                 { orders }
             </div>
         );
    }
}

const mapDispatchToProps = dispatch => ({
    onFetchOrders: (token, userId) => dispatch(actions.fetchOrders(token, userId))
})

const mapStateToProps = state => ({
    orders: state.order.orders,
    loading: state.order.loading,
    token: state.auth.token,
    userId: state.auth.userId,
})

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));