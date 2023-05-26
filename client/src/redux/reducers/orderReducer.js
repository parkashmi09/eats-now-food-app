export const orderReducer = (state = [], action) => {
  switch (action.type) {
    case "SET_ORDER":
      return action.orders;
    case "GET_ORDER":
      return state;
    default:
      return state;
  }
};
