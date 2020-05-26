import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import thunk from "redux-thunk";
import { Provider } from "react-redux";
import createSagaMiddleware from "redux-saga";
import authReducer from "./store/reducers/auth";
import * as serviceWorker from "./serviceWorker";
import orderReducer from "./store/reducers/order";
import burgerBuilderReducer from "./store/reducers/burgerBuilder";
import { watchAuth, watchBurger, watchOrder } from "./store/sagas/index";
import { createStore, applyMiddleware, compose, combineReducers } from "redux";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = {
  burger: burgerBuilderReducer,
  order: orderReducer,
  auth: authReducer,
};

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  combineReducers(rootReducer),
  composeEnhancers(applyMiddleware(thunk, sagaMiddleware))
);

sagaMiddleware.run(watchAuth);
sagaMiddleware.run(watchBurger);
sagaMiddleware.run(watchOrder);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
