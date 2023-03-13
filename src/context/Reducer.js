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
  clientId: process.env.REACT_APP_CLIENT_ID,
  redirectUri: process.env.REACT_APP_CLIENT_REDIRECT_URI,
  clientSecret: process.env.REACT_APP_CLIENT_SECRET,
  // client_id: process.env.REACT_APP_CLIENT_ID,
};

// 2. Create Reducers

export const reducer = (state, action) => {
  switch (action.type) {
    case "SET_USER":
      return {
        ...state,
        user: action.user,
      };
    case "LOGOUT":
      localStorage.clear();
      return {
        ...state,
        user: null,
      };

    default:
      return state;
  }
};
