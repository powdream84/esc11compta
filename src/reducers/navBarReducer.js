import { TOGGLE_DRAWER_VISIBILITY } from "../actions/actionsNavBar";

export const initialState = {
  isDrawerOpened: false,
};

const navBarReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case TOGGLE_DRAWER_VISIBILITY:
      return {
        ...state,
        isDrawerOpened: action.payload,
      };
    default:
      return state;
  }
};

export default navBarReducer;
