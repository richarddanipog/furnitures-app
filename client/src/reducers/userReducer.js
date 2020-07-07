const initialState = {
  email: "",
  password: "",
  userTokenAuth: null,
  user: null,
  invalid: false,
  approvedSignup: undefined,
  userWishList: [],
  login: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case "LOGIN":
      return { ...state, login: !state.login };
    case "HANDLE_CHANGE":
      return {
        ...state,
        [action.payload.name]: action.payload.value,
      };
    case "FETCH_USER_TOKEN":
      return {
        ...state,
        userTokenAuth: action.payload,
      };
    case "FETCH_USER_DETAILS":
      return {
        ...state,
        user: action.payload,
      };
    case "INVALID_TOKEN":
      return {
        ...state,
        invalid: action.payload,
      };

    case "USER_SIGNUP":
      return {
        ...state,
        approvedSignup: action.payload,
      };
    case "USER_LOGOUT":
      return {
        email: "",
        password: "",
        userTokenAuth: undefined,
        user: null,
        invalid: false,
        approvedSignup: undefined,
        userWishList: [],
      };
    case "USER_WISH_LIST":
      return {
        ...state,
        userWishList: [...action.payload],
      };
    default:
      return state;
  }
}
