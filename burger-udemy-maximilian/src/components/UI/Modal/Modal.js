import React, {Component} from 'react';
import classes from './Modal.module.css'
import Aux from '../../../hoc/Auxiliary'
import Backdrop from '../Backdrop/Backdrop';

//alternative is keep as functional component and wrap with React.memo
class Modal extends Component {
    //wrapping element controls updating of wrapped element
    //OrderSummary is not updated becos wrapping element Modal has shouldComponentUpdate
    shouldComponentUpdate(nextProps, nextState) {
        return nextProps.show !== this.props.show || nextProps.children !== this.props.children;
    }

    componentDidUpdate() {
        console.log("Modal will update");
    }

    render() {
        return (
            <Aux>
                <Backdrop show={this.props.show} clicked={this.props.modalClosed}/>
                <div className={classes.Modal}
                    style={{
                        transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh)',
                        opacity: this.props.show ? '1' : '0'
                }}
                >
                    {this.props.children}
                </div>
            </Aux>
        )
    }
}


export default Modal;