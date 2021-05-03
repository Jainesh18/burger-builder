import React, { Component } from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
class Checkout extends Component {

    checkoutContinue = () => {
        this.props.history.replace('/checkout/contact-data');
    }

    checkoutCancelled = () => {
        this.props.history.goBack();
    }

    render() {
        let summary = (<Redirect to='/' />);
        if (this.props.ings) {
            const purchaseRedirected = this.props.purchased ? <Redirect to='/' /> : null;
            summary = (
                <div>
                    {purchaseRedirected}
                    <CheckoutSummary
                        ingredients={this.props.ings}
                        onCheckoutCancelled={this.checkoutCancelled}
                        onCheckoutContinue={this.checkoutContinue} />,
                    <Route
                        path={this.props.match.path + '/contact-data'}
                        component={ContactData} />
                </div>);
        }
        return summary;
    }
}

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        purchased: state.order.purchased
    };
}

export default connect(mapStateToProps)(Checkout);