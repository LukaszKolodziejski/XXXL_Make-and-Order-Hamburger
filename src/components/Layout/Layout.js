import React, { Component, Fragment } from "react";
import Aux from "../../hoc/Aux";
// <Aux> === <Fragment>
// import classes from "./css/Layout.module.css";
import classes from "./css/Layout.module.css";

const Layout = props => {
  return (
    <Fragment>
      <div>Toolbar, SideDrawer, Backdrop</div>
      <main className={classes.Content}>{props.children}</main>
    </Fragment>
  );
};

export default Layout;
