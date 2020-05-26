import React, { Fragment, useRef, useEffect } from "react";
import styles from "./css/Modal.module.css";
import Backdrop from "../Backdrop/Backdrop";
import gsap from "gsap";

const Modal = (props) => {
  const wrapper = useRef(null);
  useEffect(() => {
    const tl = gsap.timeline();
    const modal = wrapper.current;
    props.show
      ? tl.to(modal, { duration: 0.3, autoAlpha: 1, y: 0 })
      : tl.to(modal, { duration: 0.3, autoAlpha: 0, y: "-500" });
  });
  return (
    <Fragment>
      <Backdrop show={props.show} clicked={props.modalClosed} />
      <div ref={wrapper} className={styles.Modal}>
        {props.children}
      </div>
    </Fragment>
  );
};

export default Modal;
