import React, { Component } from "react";
import classes from "./css/BurgerIngredients.module.css";
import PropTypes from "prop-types";
class BurgerIngredients extends Component {
  render() {
    let ingredients = null;

    switch (this.props.type) {
      case "BreadBottom":
        ingredients = <div className={classes.BreadBottom}></div>;
        break;
      case "BreadTop":
        ingredients = (
          <div className={classes.BreadTop}>
            <div className={classes.Seeds1}></div>
            <div className={classes.Seeds2}></div>
          </div>
        );
        break;
      case "Meat":
        ingredients = <div className={classes.Meat}></div>;
        break;
      case "Cheese":
        ingredients = <div className={classes.Cheese}></div>;
        break;
      case "Salad":
        ingredients = <div className={classes.Salad}></div>;
        break;
      case "Bacon":
        ingredients = <div className={classes.Bacon}></div>;
        break;
      default:
        ingredients = null;
    }
    return ingredients;
  }
}

BurgerIngredients.propTypes = {
  type: PropTypes.string.isRequired,
};

export default BurgerIngredients;
