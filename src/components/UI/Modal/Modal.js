import React, { Component } from 'react';
import classes from './Modal.css';
import Aux from '../../../hoc/Auxiliary';
import Backdrop from '../Backdrop/Backdrop';

class Modal extends Component {
    shouldComponentUpdate(nextProps, nextSate) {
        return nextProps.show !== this.props.show;
    }
    componentDidUpdate(){
        console.log('[Modal] Will Update');
    }
    render() {
        return (
            <Aux>
                <Backdrop show={this.props.show} clicked={this.props.modalClosed} />
                <div
                    className={classes.Modal}
                    style={{
                        transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh)',
                        backgroundColor: '#F2D398',
                        opacity: this.props.show ? '1' : '0',
                    }}>
                    {this.props.children}
                </div>
            </Aux>
        );
    }
}

export default Modal;