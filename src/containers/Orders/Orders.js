import React, { Component } from 'react';
import Order from '../../components/Order/Order';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../axios-order';
import { connect } from 'react-redux';
import Spinner from '../../components/UI/Spinner/Spinner';
import * as actions from '../../store/actions/index'

class Orders extends Component {
    componentDidMount() {
        this.props.onFetchOrders()
    }
    render() {
        let orders = <Spinner />
        if (!this.props.loading) {
            orders = (
                this.props.orders.map(order => {
                    return <Order
                        ingredients={order.ingredients}
                        totalPrice={+order.totalPrice}
                        key={order.id} />
                })
            );
        }
        return (
            <div>
                {orders}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        orders: state.order.orders,
        loading: state.order.loading,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchOrders: () => dispatch(actions.fetchOrders())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));