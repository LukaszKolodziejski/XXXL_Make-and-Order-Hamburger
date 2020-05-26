import React from "react";
import burgerLogo from "../../assets/images/burger.png";
import styles from "./css/Logo.module.css";

const Logo = props => {
  return (
    <div className={styles.Logo} style={{ height: props.height }}>
      <img src={burgerLogo} alt="my burger Logo" />
    </div>
  );
};

export default Logo;
