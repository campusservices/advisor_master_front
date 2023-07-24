import * as actionTypes from "./actions/actionTypes";

const initialState = { confirmed: false, httpStatus: 200 };
const AUTHENTICATE = "AUTHENTICATE";

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTHENTICATE_USER:
      state = {
        ...state,
        confirmed: action.payload,
        httpStatus: action.status,
      };
      break;
    case actionTypes.RESET_AUTHENTICATION:
      state = {
        ...state,
        confirmed: action.payload,
      };
      break;
    default:
      state = JSON.parse(sessionStorage.getItem(AUTHENTICATE)) || state;
      break;
  }
  sessionStorage.setItem(AUTHENTICATE, JSON.stringify(state));
  return state;
};

export default reducer;
