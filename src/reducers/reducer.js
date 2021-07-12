export const initialState = {
  isSignIn: false,
};

export const ACTION_TYPE = {
  SIGN_IN: "SIGN_IN",
  SIGN_OUT: "SIGN_OUT",
};

const reducer = (state, action) => {
  // eslint-disable-next-line default-case
  switch (action.type) {
    case ACTION_TYPE.SIGN_IN:
      return {
        ...state,
        isSignIn: true,
      };
    case ACTION_TYPE.SIGN_OUT:
      return {
        ...state,
        isSignIn: false,
      };
  }
};

export default reducer;
