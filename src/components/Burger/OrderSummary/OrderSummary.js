import React, { Component, Fragment } from "react";
import Button from "../../UI/Button/Button";

class OrderSummary extends Component {
  state = {};

  render() {
    const ingredientSummary = Object.keys(
      this.props.ingredients
    ).map((igKey) => (
      <li key={igKey}>{`${igKey}: ${this.props.ingredients[igKey]}`}</li>
    ));

    return (
      <Fragment>
        <h3>Your Order</h3>
        <p>A delicious burger with the following ingredients:</p>
        <ul>{ingredientSummary}</ul>
        <p>
          <strong>Total Price: {this.props.price.toFixed(2)} $ </strong>
        </p>
        <p>Continue to Checkout?</p>
        <Button btnType="Danger" clicked={this.props.ordered}>
          Cancel
        </Button>
        <Button btnType="Success" clicked={this.props.continueOrder}>
          Continue
        </Button>
      </Fragment>
    );
  }
}

export default OrderSummary;
