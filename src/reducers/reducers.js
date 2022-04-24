import { combineReducers } from "redux";

import navBarReducer from "./navBarReducer";
import loginReducer from "./loginReducer";
import subscribersReducer from "./subscribersReducer";
import treasuryReducer from "./treasuryReducer";

const rootReducer = combineReducers({
  navbar: navBarReducer,
  login: loginReducer,
  subscribers: subscribersReducer,
  treasury: treasuryReducer,
});

export default rootReducer;
