import React, { Fragment } from "react";
import styles from "./css/Menu.module.css";

const Menu = props => {
  return (
    <Fragment>
      <div className={styles.Menu} onClick={props.openNow}>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </Fragment>
  );
};

export default Menu;
