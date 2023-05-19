export const setAllUserDetails = (users) => {
  return {
    type: "SET_ALL_USERS",
    allUsers: users,
  };
};

export const getAllUserDetails = () => {
  return {
    type: "GET_ALL_USERS",
  };
};
