import * as actionTypes from "./actionTypes";
import * as advisorapi from "../../../api/advisorApi";

export const receiveTransactionData = (data, status) => ({
  type: actionTypes.BIND_TRANSACTION_MODEL,
  payload: data,
  status,
});
export const resetAuthentication = (data) => ({
  type: actionTypes.RESET_AUTHENTICATION,
  payload: data,
});
export const showCustomError = (error) => ({
  type: actionTypes.CUSTOM_ERROR,
  payload: { error },
});

export const receiveAuthenticatedUser = (data, status) => ({
  type: actionTypes.AUTHENTICATE_USER,
  payload: data,
  status,
});

export const authenticateUser = (username, password) => {
  return (dispatch) => {
    advisorapi.authenticateUser(username, password).then((res) => {
      dispatch(receiveAuthenticatedUser(res.data, res.status));
    });
  };
};

export const receiveFilters = (data) => ({
  type: actionTypes.SAVE_FILTERS,
  payload: data,
});

export const saveFilter = (fileType, deptCode, email) => {
  const data = { fileType, deptCode, email };
  return (dispatch) => {
    dispatch(receiveFilters(data));
  };
};
