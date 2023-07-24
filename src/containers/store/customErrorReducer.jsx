import * as actionTypes from "./actions/actionTypes";

const initialState = { error: null };
const CUSTOM_ERROR = "CUSTOM_ERROR";

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.CUSTOM_ERROR:
      state = { ...state, error: action.payload };
      break;
    default:
      state = JSON.parse(sessionStorage.getItem(CUSTOM_ERROR)) || state;
      break;
  }
  sessionStorage.setItem(CUSTOM_ERROR, JSON.stringify(state));
  return state;
};

export default reducer;
