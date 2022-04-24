import { UPDATE_INPUT_VALUE } from "../actions/actionsLogin";
import { UPDATE_CONNECTION_STATUS } from "../actions/actionsLogin";

export const initialState = {
  isConnected: false,
  inputValueEmail: "",
  inputValuePassword: "",
};

const loginReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    //console.log("payload", action.payload);
    case UPDATE_CONNECTION_STATUS:
      return {
        ...state,
        isConnected: action.payload,
      };
    case UPDATE_INPUT_VALUE:
      return {
        ...state,
        [action.payload.inputState]: action.payload.value,
      };
    default:
      return state;
  }
};

export default loginReducer;
