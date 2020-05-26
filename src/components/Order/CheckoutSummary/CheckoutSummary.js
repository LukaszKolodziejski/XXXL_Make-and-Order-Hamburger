import React from "react";
import Burger from "../../Burger/Burger";
import Button from "../../UI/Button/Button";
import styles from "./css/CheckoutSummary.module.css";

const CheckoutSummary = (props) => {
  return (
    <div className={styles.CheckoutSummary}>
      <h1>We hope it tastes well! </h1>
      <div className={styles.Burger}>
        <Burger ingredients={props.ingredients} />
      </div>
      <Button btnType="Danger" clicked={() => props.checkoutHandler("/")}>
        Start Again
      </Button>
      <Button
        btnType="Success"
        clicked={() => props.checkoutHandler(`${props.match.url}/contact-data`)}
      >
        Continue
      </Button>
    </div>
  );
};

export default CheckoutSummary;
