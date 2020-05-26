import React from "react";
import { BrowserRouter as Router, withRouter } from "react-router-dom";
import BurgerIngredients from "./BurgerIngredients/BurgerIngredients";
import classes from "./css/Burger.module.css";
import AnimeText from "./AnimeText";

const Burger = (props) => {
  let transformedIngredients = Object.keys(props.ingredients)
    .map((igKey) =>
      [...Array(props.ingredients[igKey])].map((_, i) => (
        <BurgerIngredients key={igKey + i} type={igKey} />
      ))
    )
    .reduce((acc, el) => acc.concat(el), []);
  if (!transformedIngredients.length) {
    // transformedIngredients = <p>Choose your dream ingredients!</p>;
    transformedIngredients = <AnimeText />;
  }
  return (
    <div className={classes.Burger}>
      <BurgerIngredients type="BreadTop" />
      {transformedIngredients}
      <BurgerIngredients type="BreadBottom" />
    </div>
  );
};

export default withRouter(Burger);
