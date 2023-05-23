export const cartReducer = (state = null, action) => {
  switch (action.type) {
    case "SET_CART_ITEMS":
      return action.items;
    case "GET_CART_ITEMS":
      return state;
    case "CLEAR_CART_ITEM":
      return action.items;
    default:
      return state;
  }
};
