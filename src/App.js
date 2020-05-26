import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Layout from "./containers/Layout/Layout";
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
import Checkout from "./containers/Checkout/Checkout";
import Orders from "./containers/Orders/Orders";
import Auth from "./containers/Auth/Auth";
import Logout from "./containers/Auth/Logout/Logout";
import * as actionsCreators from "./store/actions/index";
import { connect } from "react-redux";

class App extends Component {
  componentDidMount = () => this.props.onTryAutoSignIn();

  render() {
    return (
      <Router>
        <Layout>
          <Route path="/" exact component={BurgerBuilder} />
          <Route path="/checkout" component={Checkout} />
          <Route path="/orders" component={Orders} />
          <Route path="/logout" component={Logout} />
          <Route path="/auth" component={Auth} />
        </Layout>
      </Router>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  onTryAutoSignIn: () => dispatch(actionsCreators.authCheckState()),
});

export default connect(null, mapDispatchToProps)(App);
