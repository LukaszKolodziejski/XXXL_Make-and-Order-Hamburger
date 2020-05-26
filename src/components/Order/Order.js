import React from "react";
import styles from "./css/Order.module.css";

const Order = (props) => {
  let ingredients = [];
  for (let key in props.ingredients) {
    ingredients.push({
      name: key,
      amount: props.ingredients[key],
    });
  }
  const ingredientOutput = ingredients.map((ig) => (
    <span key={ig.name} className={styles.Ingredient}>
      {ig.name} ({ig.amount})
    </span>
  ));
  return (
    <div className={styles.Order}>
      <p>Ingredients: {ingredientOutput}</p>
      <p>
        Price: <strong>USD {props.totalPrice.toFixed(2)}</strong>
      </p>
    </div>
  );
};

export default Order;
