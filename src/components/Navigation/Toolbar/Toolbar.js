import React from "react";
import styles from "./css/Toolbar.module.css";
import Logo from "../../Logo/Logo";
import NavigationItems from "../NavigationItems/NavigationItems";
import Menu from "../../UI/Menu/Menu";

const Toolbar = (props) => {
  return (
    <header className={styles.Toolbar}>
      <Menu openNow={props.toggleClosedState} />
      <Logo height="80%" />
      <nav className={styles.DeskopOnly}>
        <NavigationItems isAuth={props.isAuth} />
      </nav>
    </header>
  );
};

export default Toolbar;
