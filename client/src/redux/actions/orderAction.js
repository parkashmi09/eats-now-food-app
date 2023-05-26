export const setOrder = (items) => {
  return {
    type: "SET_ORDER",
    orders: items,
  };
};

export const getOrder = () => {
  return {
    type: "GET_ORDER",
  };
};
