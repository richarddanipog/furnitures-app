const initialState = {
  allUsers: [],
  allItems: [],
  toAdminPanel: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case "IS_ADMIN":
      return {
        ...state,
        toAdminPanel: !state.toAdminPanel,
      };
    case "FETCH_ALL_USERS":
      return {
        ...state,
        allUsers: [...action.payload],
      };
    case "FETCH_ALL_ITEMS":
      return {
        ...state,
        allItems: action.payload,
      };
    default:
      return state;
  }
}
