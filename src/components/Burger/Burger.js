import React from "react";
import BurgerIngredients from "./BurgerIngredients/BurgerIngredients";
import classes from "./css/Burger.module.css";

const Burger = props => {
  const transformedIngredients = <p>work</p>;
  return (
    <div className={classes.Burger}>
      <BurgerIngredients type="BreadTop" />
      <BurgerIngredients type="Meat" />
      <BurgerIngredients type="Cheese" />
      <BurgerIngredients type="Salad" />
      <BurgerIngredients type="Bacon" />
      <BurgerIngredients type="BreadBottom" />
      {transformedIngredients}
    </div>
  );
};

export default Burger;
