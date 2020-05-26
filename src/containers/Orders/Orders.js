import React, { Component } from "react";
import Order from "../../components/Order/Order";
import Spinner from "../../components/UI/Spinner/Spinner";
import NoToken from "./NoToken";
import * as actionCreators from "../../store/actions/index";
import { connect } from "react-redux";

class Orders extends Component {
  // onLoadingOrders() is Asynchronous function with 'redux-thunk',
  // created in actionCreators before Reducer
  // where the axios dispatching again fatchData asynchronously
  componentDidMount = () => this.props.onLoadingOrders(this.props.idToken);

  render() {
    let orders;
    this.props.loading
      ? (orders = <Spinner />)
      : this.props.idToken
      ? (orders = this.props.orders.map((obj) => (
          <Order
            key={obj.id}
            ingredients={obj.ingredients}
            totalPrice={obj.totalPrice}
          />
        )))
      : (orders = <NoToken />);
    return <div>{orders}</div>;
  }
}

const mapStateToProps = ({ order, auth }) => {
  const { orders, loading } = { ...order };
  const { idToken } = { ...auth };
  return { orders, loading, idToken };
};

const mapDispatchToProps = (dispatch) => ({
  onLoadingOrders: (token) => dispatch(actionCreators.orders(token)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Orders);
