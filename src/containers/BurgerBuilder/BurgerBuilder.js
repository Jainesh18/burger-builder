import React, { Component } from 'react';
import {connect} from 'react-redux';
import Aux from '../../hoc/Auxiliary/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../axios-order';
import * as actions from '../../store/actions/index';


class BurgerBuilder extends Component {
    state = {
        purchasing: false,
    }
    componentDidMount() {
        console.log(this.props);
        this.props.onInitIngredients();
    }

    updatePurchaseState(ingredients) {
        const sum = Object.keys(ingredients).map(igKey => {
            return ingredients[igKey];
        }).reduce((sum, el) => {
            return sum + el;
        }, 0);
        return sum > 0;
    }

    purchaseHandler = () => {
        this.setState({ purchasing: true });
    }

    purchaseCancelHandler = () => {
        this.setState({ purchasing: false, });
    }

    purchaseContinueHandler = () => {
        this.props.onInitPurchase();
        this.props.history.push('/checkout');
    }


    render() {
        const disbaledInfo = { ...this.props.ings };
        for (let key in disbaledInfo) {
            disbaledInfo[key] = disbaledInfo[key] <= 0
        }
        let orderSummary = null;
        let burger = this.props.error?<p style={{padding:5+'px'}}>Ingredients can't be loaded!..</p>:<Spinner />
        if (this.props.ings) {

            burger = (
                <Aux>
                    <Burger ingredients={this.props.ings} />
                    <BuildControls
                        ingredientAdded={this.props.onAddIngredient}
                        ingredientRemoved={this.props.onDelIngredient}
                        disabled={disbaledInfo}
                        purchasable={this.updatePurchaseState(this.props.ings)}
                        price={this.props.totalPrice}
                        purchasing={this.purchaseHandler} />
                </Aux>
            );
            orderSummary = <OrderSummary
                purchaseContinued={this.purchaseContinueHandler}
                purchaseCancelled={this.purchaseCancelHandler}
                ingredients={this.props.ings}
                totalPrice={this.props.totalPrice} />
        }
        return (
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        );
    }
}

const mapStateToProps=state=>{
    return{
        ings:state.burgerBuilder.ingredients,
        totalPrice:state.burgerBuilder.totalPrice, 
        error:state.burgerBuilder.error
    };
}

const mapDispatchToProps=dispatch=>{
    return{
        onAddIngredient:(ingName)=>dispatch(actions.addIngredient(ingName)),
        onDelIngredient:(ingName)=>dispatch(actions.deleteIngredient(ingName)),
        onInitIngredients:()=>dispatch(actions.initIngredients()),
        onInitPurchase:()=>dispatch(actions.purchaseInit())
    };
}
export default connect (mapStateToProps,mapDispatchToProps)(withErrorHandler(BurgerBuilder,axios));