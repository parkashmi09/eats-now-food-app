const allUsersReducer = (state = null, action) => {
  switch (action.type) {
    case "GET_ALL_USERS":
      return state;
    case "SET_ALL_USERS":
      return action.allUsers;

    default:
      return state;
  }
};

export default allUsersReducer;
