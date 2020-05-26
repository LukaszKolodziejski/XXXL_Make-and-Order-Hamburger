import React, { Component, Fragment } from "react";
import { BrowserRouter as Router, Redirect } from "react-router-dom";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import Spinner from "../../components/UI/Spinner/Spinner";
import Burger from "../../components/Burger/Burger";
import Modal from "../../components/UI/Modal/Modal";
import { connect } from "react-redux";
import * as actionCreators from "../../store/actions/index";

export class BurgerBuilder extends Component {
  state = {
    purchasing: false,
    loading: false,
    checkoutPage: false,
  };

  // If we wait on data from database
  // burger = <Spinner />
  componentDidMount = () => this.props.onInitIngredients();

  updatePurchaseState = (ingredients) => {
    const sum = Object.keys(ingredients)
      .map((igKey) => ingredients[igKey])
      .reduce((sum, el) => sum + el, 0);
    return sum > 0;
  };

  purchaseHandler = () =>
    this.setState((prevState) => ({ purchasing: !prevState.purchasing }));

  changeLoadingTo = (e) => this.setState({ loading: e, purchasing: e });

  purchaseContinueHandler = () => {
    this.changeLoadingTo(true);
    this.setState({ checkoutPage: true });
    setTimeout(() => this.changeLoadingTo(false), 100);
  };

  render() {
    const { purchasing, loading, checkoutPage } = {
      ...this.state,
    };

    // This props are from Redux
    const { ingredients, totalPrice, error } = { ...this.props };

    let disabledInfo = { ...ingredients };
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }

    let burger = <Spinner />;
    let orderSummary;
    if (ingredients) {
      burger = (
        <Fragment>
          <Burger ingredients={ingredients} />
          <BuildControls
            ingredientAdded={this.props.onAddIngredientHandler}
            ingredientRemoved={this.props.onRemoveIngredientHandler}
            ingredients={ingredients}
            disabled={disabledInfo}
            price={totalPrice}
            purchasable={this.updatePurchaseState(ingredients)}
            purchasing={purchasing}
            ordered={this.purchaseHandler}
          />
        </Fragment>
      );

      loading
        ? (orderSummary = <Spinner />)
        : (orderSummary = (
            <Fragment>
              <OrderSummary
                ingredients={ingredients}
                ordered={this.purchaseHandler}
                continueOrder={this.purchaseContinueHandler}
                price={totalPrice}
              />
              {checkoutPage && <Redirect to={`/checkout`} />}
            </Fragment>
          ));
    }

    error &&
      (burger = (
        <p>
          Ingredients can't be loaded. <strong>404</strong>
        </p>
      ));

    return (
      <Fragment>
        <Modal show={purchasing} modalClosed={this.purchaseHandler}>
          {orderSummary}
        </Modal>
        {burger}
      </Fragment>
    );
  }
}

const mapStateToProps = ({ burger }) => {
  const { ingredients, totalPrice, error } = { ...burger };
  return {
    ingredients,
    totalPrice,
    error,
  };
};

const mapDispatchToProps = (dispatch) => ({
  onInitIngredients: () => dispatch(actionCreators.initIngredients()),
  onAddIngredientHandler: (ingredient) =>
    dispatch(actionCreators.addIngredients(ingredient)),
  onRemoveIngredientHandler: (ingredient) =>
    dispatch(actionCreators.removeIngredients(ingredient)),
});

export default connect(mapStateToProps, mapDispatchToProps)(BurgerBuilder);
