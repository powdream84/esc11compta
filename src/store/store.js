import { createStore, applyMiddleware, compose } from "redux";
import reducer from "../reducers/reducers";
import middleware from "../middlewares/middleware";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const enhancers = composeEnhancers(applyMiddleware(middleware));

const store = createStore(reducer, enhancers);

export default store;
