import React from "react";
import styles from "./css/Backdrop.module.css";

const Backdrop = props => {
  return (
    props.show && (
      <div className={styles.Backdrop} onClick={props.clicked}></div>
    )
  );
};

export default Backdrop;
