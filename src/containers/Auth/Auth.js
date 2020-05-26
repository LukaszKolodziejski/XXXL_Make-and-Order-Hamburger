import React, { Component, Fragment } from "react";
import { Redirect } from "react-router-dom";
import Input from "../../components/UI/Input/Input";
import Button from "../../components/UI/Button/Button";
import styles from "./css/Auth.module.css";
import Spinner from "../../components/UI/Spinner/Spinner";
import WrapperAuth from "./WrapperAuth";
import { connect } from "react-redux";
import * as actionCreators from "../../store/actions/index";

class Auth extends Component {
  state = {
    controls: {
      email: {
        elementType: "input",
        elementConfig: {
          type: "email",
          placeholder: "Mail Address",
        },
        value: "",
        validation: {
          required: true,
          isEmail: true,
        },
        valid: false,
      },
      password: {
        elementType: "input",
        elementConfig: {
          type: "password",
          placeholder: "Password",
        },
        value: "",
        validation: {
          required: true,
          minLength: 6,
        },
        valid: false,
      },
    },
    isSignup: true,
  };

  checkValidity(value, rules) {
    let isValid = true;
    if (!rules) {
      return true;
    }

    if (rules.required) {
      isValid = value.trim() !== "" && isValid;
    }

    if (rules.minLength) {
      isValid = value.length >= rules.minLength && isValid;
    }

    if (rules.isEmail) {
      const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
      isValid = pattern.test(value) && isValid;
    }
    return isValid;
  }

  inputHandler = (e, key) => {
    const { controls } = this.state;
    const updatedControls = {
      ...controls,
      [key]: {
        ...controls[key],
        value: e.target.value,
        valid: this.checkValidity(e.target.value, controls[key].validation),
      },
    };
    this.setState({ controls: updatedControls });
  };

  orderHandler = (e) => {
    e.preventDefault();
    const { email, password } = this.state.controls;
    const { isSignup } = this.state;
    this.props.onAuth(email.value, password.value, isSignup);
  };

  switchAuthModeHandler = () =>
    this.setState((prevState) => ({ isSignup: !prevState.isSignup }));

  render() {
    const allInputs = [];
    for (const key in this.state.controls) {
      const {
        elementType,
        elementConfig,
        value,
        valid,
        validation,
      } = this.state.controls[key];
      allInputs.push(
        <Input
          key={key}
          elementType={elementType}
          elementConfig={elementConfig}
          value={value}
          valid={!valid}
          shouldValidate={validation}
          changed={(e) => this.inputHandler(e, key)}
        />
      );
    }
    let authForm, errorMessage;
    this.props.loading
      ? (authForm = <Spinner />)
      : (authForm = (
          <div className={styles.Auth}>
            {errorMessage}
            <form onSubmit={this.orderHandler}>
              {allInputs}
              <WrapperAuth x="40">
                <Button btnType="Success">Submit</Button>
              </WrapperAuth>
            </form>
            <WrapperAuth x="-50">
              <Button btnType="Danger" clicked={this.switchAuthModeHandler}>
                Switch to {this.state.isSignup ? "Sign up" : "Sign in"}
              </Button>
            </WrapperAuth>
            {this.props.idToken && <Redirect to="/orders" />}
          </div>
        ));
    this.props.error
      ? (errorMessage = (
          <p style={{ color: "red" }}>{this.props.error.message}</p>
        ))
      : (errorMessage = null);

    return authForm;
  }
}

const mapStateToProps = ({ auth }) => ({
  loading: auth.loading,
  error: auth.error,
  idToken: auth.idToken !== null,
});

const mapDispatchToProps = (dispatch) => ({
  onAuth: (email, password, isSignup) =>
    dispatch(actionCreators.auth(email, password, isSignup)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
