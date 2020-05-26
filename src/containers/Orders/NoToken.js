import React, { Fragment, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "./css/Orders.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowAltCircleUp } from "@fortawesome/free-solid-svg-icons";
import gsap from "gsap";

const NoToken = (props) => {
  const wrapper = useRef(null);
  const wrapper2 = useRef(null);
  useEffect(() => {
    const tl = gsap;
    const tl2 = gsap.timeline({ repeat: "-1", yoyo: true });
    const auth = wrapper.current;
    const arrow = wrapper2.current;
    tl.set(auth, { y: "-50", ease: "power1.inOut" });
    tl2.set(arrow, { y: 0, ease: "power1.inOut" });
    tl.to(auth, { duration: 1.3, ease: "power1.inOut", y: "0" });
    tl2.to(arrow, { duration: 0.7, ease: "power1.inOut", y: "20" });
  });

  return (
    <Fragment>
      <div ref={wrapper2} className={styles.BoxArrow}>
        <FontAwesomeIcon icon={faArrowAltCircleUp} className={styles.Arrow} />
      </div>
      <div ref={wrapper}>
        <Link to="auth" className={styles.Token}>
          Authenticate to see all orders.
        </Link>
      </div>
    </Fragment>
  );
};

export default NoToken;
