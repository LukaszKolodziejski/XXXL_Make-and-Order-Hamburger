import React, { Fragment, useRef, useEffect } from "react";
import styles from "./css/SideDrawer.module.css";
import Logo from "../../Logo/Logo";
import NavigationItems from "../NavigationItems/NavigationItems";
import Backdrop from "../../UI/Backdrop/Backdrop";
import gsap from "gsap";

const SideDrawer = (props) => {
  const { SideDrawer } = styles;
  const wrapper = useRef(null);
  useEffect(() => {
    const side = wrapper.current;
    const tl = gsap;
    tl.set(side, { x: "-300", ease: "power1.inOut" });
    props.open
      ? tl.to(side, { duration: 0.3, ease: "power1.inOut", x: "+=300" })
      : tl.to(side, { duration: 0.3, ease: "power1.inOut", x: "-=300" });
  });

  return (
    <Fragment>
      <Backdrop show={props.open} clicked={props.closed} />
      <div ref={wrapper} className={SideDrawer}>
        <Logo height="11%" />
        <nav onClick={props.closed}>
          <NavigationItems isAuth={props.isAuth} />
        </nav>
      </div>
    </Fragment>
  );
};

export default SideDrawer;
