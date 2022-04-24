const recipesMiddleware = (store) => (next) => async (action) => {
  next(action);
};

export default recipesMiddleware;
