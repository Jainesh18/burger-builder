import React, { Component } from 'react';
import {connect} from 'react-redux';
import Aux from '../../hoc/Auxiliary/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-order';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actionTypes from '../../store/actions';



class BurgerBuilder extends Component {
    state = {
        purchasing: false,
        loading: false,
        error:false,
    }

    componentDidMount() {
        console.log(this.props);
        // axios.get('https://react-my-burger-83971-default-rtdb.firebaseio.com/ingredients.json').then(
        //     response => {
        //         this.setState({ ingredients: response.data });
        //     }
        // ).catch(error=>{
        //     this.setState({error:true})
        // })
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
        this.props.history.push('/checkout');
    }


    render() {
        const disbaledInfo = { ...this.props.ings };
        for (let key in disbaledInfo) {
            disbaledInfo[key] = disbaledInfo[key] <= 0
        }
        let orderSummary = null;
        let burger = this.state.error?<p style={{padding:5+'px'}}>Ingredients can't be loaded!..</p>:<Spinner />
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
        if (this.state.loading) {
            orderSummary = <Spinner />
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
        ings:state.ingredients,
        totalPrice:state.totalPrice, 
    };
}

const mapDispatchToProps=dispatch=>{
    return{
        onAddIngredient:(ingName)=>dispatch({type:actionTypes.ADD_INGREDIENT, ingredientName:ingName}),
        onDelIngredient:(ingName)=>dispatch({type:actionTypes.DEL_INGREDIENT,ingredientName:ingName})
    };
}
export default connect (mapStateToProps,mapDispatchToProps)(withErrorHandler(BurgerBuilder,axios));