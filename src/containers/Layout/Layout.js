import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import classes from "./css/Layout.module.css";
import Toolbar from "../../components/Navigation/Toolbar/Toolbar";
import SideDrawer from "../../components/Navigation/SideDrawer/SideDrawer";

class Layout extends Component {
  state = {
    showSideDrawer: false,
  };
  sideDrawerClosedHandler = () =>
    this.setState((prevState) => ({
      showSideDrawer: !prevState.showSideDrawer,
    }));

  render() {
    const { isAuth } = this.props;
    return (
      <Fragment>
        <SideDrawer
          open={this.state.showSideDrawer}
          closed={this.sideDrawerClosedHandler}
          isAuth={isAuth}
        />
        <Toolbar
          toggleClosedState={this.sideDrawerClosedHandler}
          isAuth={isAuth}
        />
        <main className={classes.Content}>{this.props.children}</main>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => ({ isAuth: state.auth.idToken !== null });

export default connect(mapStateToProps)(Layout);
