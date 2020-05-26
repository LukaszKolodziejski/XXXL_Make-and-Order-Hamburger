import React from "react";
import styles from "./css/BuildControl.module.css";

const BuildControl = props => {
  return (
    <div className={styles.BuildControl}>
      <div className={styles.Label}>{props.label}</div>
      <button
        onClick={props.removed}
        className={styles.Less}
        disabled={props.disabled || props.purchasing}
      >
        Less
      </button>
      <button
        onClick={props.added}
        className={styles.More}
        disabled={props.purchasing}
      >
        More
      </button>
    </div>
  );
};

export default BuildControl;
