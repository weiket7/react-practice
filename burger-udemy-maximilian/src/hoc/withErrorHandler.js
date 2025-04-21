import React, { Component } from 'react';
import Modal from '../components/UI/Modal/Modal';
import Aux from './Auxiliary'


const withErrorHandler = (WrappedComponent, axios) => {
    return class extends Component {
        state = {
            error: null,

        }
        
        //componentDidMount runs after componentDidMount in child components completed
        //componentDidMount() {
        componentWillMount() {
            this.requestInterceptor = axios.interceptors.request.use(request => {
                this.setState({error: null});
                return request; //so that request can continue
            })
            this.responseInterceptor = axios.interceptors.response.use(response => response, error => {
                this.setState({error: error});
            })
        }

        //when BurgerBuilder is no longer needed, remove old interceptors
        //for useEffect, it would be in return        
        componentWillUnmount() {
            axios.interceptors.request.eject(this.requestInterceptor);
            axios.interceptors.response.eject(this.responseInterceptor);
        }

        errorConfirmedHandler = () => {
            this.setState({error: null});
        }

        render() {
            return (
                <Aux>
                    <Modal show={this.state.error} 
                        modalClosed={this.errorConfirmedHandler}>
                        {this.state.error ? this.state.error.message : null}
                    </Modal>
                    <WrappedComponent {...this.props} />
                </Aux>
            )
        }
    }
}

export default withErrorHandler;