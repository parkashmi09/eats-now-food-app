export const setProducts = (products) => {
  return {
    type: "SET_PRODUCTS",
    products: products,
  };
};

export const getAllProducts = () => {
  return {
    type: "GET_ALL_PRODUCTS",
  };
};
