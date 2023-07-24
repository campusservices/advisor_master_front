import * as actionTypes from "./actions/actionTypes";

const initialState = { data: null };
const FILTER = "FILTER";

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SAVE_FILTERS:
      state = {
        ...state,
        data: action.payload,
      };
      break;
    default:
      state = JSON.parse(sessionStorage.getItem(FILTER)) || state;
      break;
  }
  sessionStorage.setItem(FILTER, JSON.stringify(state));
  return state;
};

export default reducer;
