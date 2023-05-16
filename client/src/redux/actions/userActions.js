export const setUserDetails = (data) => {
  return {
    type: "SET_USER",
    user: data,
  };
};
export const getUserDetails = () => {
  return {
    type: "GET_USER",
  };
};
export const deleteUsers = () => {
  return {
    type: "REMOVE_USER",
    user: null,
  };
};
