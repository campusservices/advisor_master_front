import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import thunk from "redux-thunk";
import { legacy_createStore as createStore, applyMiddleware, combineReducers, compose } from "redux";
import { Provider } from "react-redux";
import transactionReducer from "./containers/store/transactionReducer";
import customErrorReducer from "./containers/store/customErrorReducer";
import authenticateReducer from "./containers/store/authenticateReducer";
import filterReducer from "./containers/store/filterReducer";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
  transaction : transactionReducer,
  customError : customErrorReducer,
  authenticate: authenticateReducer,
  filter      :filterReducer,
});
const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
