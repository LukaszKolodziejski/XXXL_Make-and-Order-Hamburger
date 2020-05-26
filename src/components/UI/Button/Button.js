import React from "react";
import styles from "./css/Button.module.css";

const Button = (props) => (
  <button
    className={[styles.Button, styles[props.btnType]].join(" ")}
    disabled={props.disabled}
    onClick={props.clicked}
  >
    {props.children}
  </button>
);

export default Button;
