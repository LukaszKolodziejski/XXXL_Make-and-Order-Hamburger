import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import ContactData from "./ContactData/ContactData";
import { connect } from "react-redux";

class Checkout extends Component {
  checkoutHandler = (nextPage) => this.props.history.push(nextPage);

  render() {
    const { ingredients } = this.props;
    return (
      <div>
        <CheckoutSummary
          {...this.props}
          ingredients={ingredients}
          checkoutHandler={this.checkoutHandler}
        />
        <Route
          path={`${this.props.match.path}/contact-data`}
          component={ContactData}
        />
      </div>
    );
  }
}

const mapStateToProps = ({ burger }) => {
  const { ingredients } = { ...burger };
  return { ingredients };
};

export default connect(mapStateToProps)(Checkout);
