import React, { Component, Fragment } from "react";
import Burger from "../../components/Burger/Burger";

class BurgerBuilder extends Component {
  state = {
    ingredients: {
      Meat: 1,
      Cheese: 1,
      Salad: 2,
      Bacon: 1
    }
  };
  render() {
    return (
      <Fragment>
        <Burger />
        <div>Build Controls</div>
      </Fragment>
    );
  }
}

export default BurgerBuilder;
