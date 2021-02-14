import React, { Component } from 'react';
import Order from '../../components/Order/Order';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../axios-order';
class Orders extends Component {
    state = {
        orders: [],
        loading: true,
    }
    componentDidMount() {
        axios.get('/orders.json').then(response => {
            let fetchedOrders = []
            for (let key in response.data) {
                fetchedOrders.push({
                    ...response.data[key],
                    id: key
                })
            }
            console.log(fetchedOrders)
            this.setState({ loading: false,orders:fetchedOrders })
        }).catch(err => {
            this.setState({ loading: false })
        })
    }
    render() {
        return (
            <div>
                {this.state.orders.map(order=>{
                   return <Order
                   ingredients={order.ingredients}
                    totalPrice={+order.price}
                   key={order.id}/>
                })}
            </div>
        )
    }
}

export default withErrorHandler(Orders,axios);