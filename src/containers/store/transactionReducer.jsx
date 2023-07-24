import * as actionTypes from "./actions/actionTypes";

const initialState = { data: null, httpStatus: 200 };
const TRANSACTION = "TRANSACTION";

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.BIND_TRANSACTION_MODEL:
      state = {
        ...state,
        data: action.payload,
        httpStatus: action.status,
      };
      break;
    default:
      state = JSON.parse(sessionStorage.getItem(TRANSACTION)) || state;
      break;
  }
  sessionStorage.setItem(TRANSACTION, JSON.stringify(state));
  return state;
};

export default reducer;
