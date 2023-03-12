// .1 Create initialState

// a. Create initital value of user by checking if user data is available in local storage before prompting user to login again

const fetchUser = () => {
  // check if user data is available on local storage and fetched else set clear localstorage
  const userData =
    localStorage.getItem("user") !== undefined
      ? JSON.parse(localStorage.getItem("user"))
      : localStorage.clear();

  return userData;
};

export const initialState = {
  user: fetchUser(),
};

// 2. Create Reducers

export const reducer = (state, action) => {
  switch (action.type) {
    case "SET_USER":
      return {
        ...state,
        user: action.user,
      };

    default:
      return state;
  }
};
