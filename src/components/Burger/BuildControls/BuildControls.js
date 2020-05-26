import React, { useEffect, useRef } from "react";
import styles from "./css/BuildControls.module.css";
import BuildControl from "./BuildControl/BuildControl";
import gsap from "gsap";

const BuildControls = (props) => {
  const wrapper = useRef(null);
  useEffect(() => {
    const tl = gsap;
    const controls = wrapper.current;
    tl.from(controls, { duration: 1.3, ease: "power1.inOut", y: "50" });
  }, []);

  const controls = Object.keys(props.ingredients).map((el) => (
    <BuildControl
      key={el}
      label={el}
      added={() => props.ingredientAdded(el)}
      removed={() => props.ingredientRemoved(el)}
      disabled={props.disabled[el]}
      purchasing={props.purchasing}
    />
  ));
  return (
    <div className={styles.BuildControls} ref={wrapper}>
      <p>
        Current Price: <span>{props.price.toFixed(2)}</span> $
      </p>
      {controls}
      <button
        className={styles.OrderButton}
        disabled={!props.purchasable || props.purchasing}
        onClick={props.ordered}
      >
        ORDER NOW
      </button>
    </div>
  );
};

export default BuildControls;
