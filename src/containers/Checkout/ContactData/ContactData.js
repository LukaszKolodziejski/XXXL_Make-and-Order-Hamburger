import React, { Component } from "react";
import Button from "../../../components/UI/Button/Button";
import styles from "./css/ContactData.module.css";
import axios from "../../../axios-orders";
import Spinner from "../../../components/UI/Spinner/Spinner";
import Input from "../../../components/UI/Input/Input";
import * as actionCreators from "../../../store/actions/index";
import { connect } from "react-redux";

class ContactData extends Component {
  state = {
    orderForm: {
      name: this.dynamicState("Your Name"),
      email: this.dynamicState("Email"),
      street: this.dynamicState("Street"),
      zipCode: this.dynamicState("Zip Code"),
      country: this.dynamicState("Country"),
      deliveryMethod: {
        elementType: "select",
        elementConfig: {
          options: [{ value: "Fastest" }, { value: "Cheapest" }],
        },
        value: "Fastest",
        validation: {
          required: true,
        },
        valid: true,
      },
    },
    formIsValid: false,
    loading: false,
  };

  dynamicState(placeholder, elementType = "input", type = "text", value = "") {
    return {
      elementType,
      elementConfig: { type, placeholder },
      value,
      validation: {
        required: true,
      },
      valid: false,
    };
  }

  changeLoadingTo = (e) => this.setState({ loading: e });

  orderHandler = (e) => {
    e.preventDefault();
    const { ingredients, totalPrice } = this.props;
    const {
      name,
      email,
      street,
      zipCode,
      country,
      deliveryMethod,
    } = this.state.orderForm;

    const order = {
      ingredients,
      totalPrice,
      customer: {
        name: name.value,
        address: {
          street: street.value,
          zipCode: zipCode.value,
          country: country.value,
        },
        email: email.value,
      },
      deliveryMethod: deliveryMethod.value,
    };

    this.changeLoadingTo(true);
    axios
      .post("/orders.json", order)
      .then((res) => {
        this.changeLoadingTo(false);
        this.props.history.push("/orders");
      })
      .catch((err) => this.changeLoadingTo(false));

    // --- Advanced version with Redux Thunk & Token from Firebase --- \\
    // this.props.onOrderBurger(order, this.props.idToken);
  };

  checkValidity = (value, rules) =>
    rules.required ? value.trim() !== "" : false;

  inputHandler = (e, id) => {
    const orderForm = { ...this.state.orderForm };
    if (e.target.elementType !== "select") {
      orderForm[id].value = e.target.value;
      orderForm[id].valid = this.checkValidity(
        orderForm[id].value,
        orderForm[id].validation
      );
    }
    let formIsValid = true;
    for (const key in orderForm) {
      formIsValid = orderForm[key].valid && formIsValid;
    }
    this.setState({ orderForm, formIsValid });
  };

  render() {
    const allInputs = [];
    for (const key in this.state.orderForm) {
      const {
        elementType,
        elementConfig,
        value,
        valid,
        validation,
      } = this.state.orderForm[key];
      allInputs.push(
        <Input
          key={key}
          elementType={elementType}
          elementConfig={elementConfig}
          value={value}
          changed={(e) => this.inputHandler(e, key)}
          valid={!valid}
          shouldValidate={validation}
        />
      );
    }
    let form = (
      <form onSubmit={this.orderHandler}>
        {allInputs}
        <Button btnType="Success" disabled={!this.state.formIsValid}>
          ORDER
        </Button>
      </form>
    );

    this.state.loading && (form = <Spinner />);

    return (
      <div className={styles.ContactData}>
        <h4>Enter your Contact Data</h4>
        {form}
      </div>
    );
  }
}

const mapStateToProps = ({ burger, auth, order }) => ({
  ingredients: burger.ingredients,
  totalPrice: burger.totalPrice,
  loading: order.loading,
  idToken: auth.idToken,
});

const mapDispatchToProps = (dispatch) => ({
  onOrderBurger: (orderData, token) =>
    dispatch(actionCreators.purchaseBurger(orderData, token)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ContactData);
