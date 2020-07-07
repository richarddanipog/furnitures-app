const initialState = {
  items: [],
  item: {},
  shoppingCart: [],
  colors: [],
  query: { colors: [] },
  countItems: [],
  randomItems: [],
  itemReviews: [],
  newItemId: undefined,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case "FETCH_ITEMS":
      return {
        ...state,
        items: action.payload,
      };
    case "FETCH_SINGLE_ITEM":
      return {
        ...state,
        item: { ...action.payload },
      };
    case "SHOPPING_CART":
      return {
        ...state,
        shoppingCart: action.payload,
      };
    case "ADD_ITEM_TO_BAG":
      return {
        ...state,
        shoppingCart: [...state.shoppingCart, action.payload],
      };
    case "REMOVE_ITEM_FROM_BAG":
      const currentShoppingCart = state.shoppingCart.filter(
        (item) => item.id !== action.payload
      );
      return {
        ...state,
        shoppingCart: currentShoppingCart,
      };
    case "CHOOSE_COLORS":
      const alreadyExists = state.query.colors.find(
        (c) => c === action.payload
      );
      if (!alreadyExists) {
        return {
          ...state,
          colors: [...state.colors, action.payload],
          query: {
            ...state.query,
            colors: [...state.query.colors, action.payload],
          },
        };
      } else {
        return {
          ...state,
          query: {
            ...state.query,
            colors: state.query.colors.filter(
              (color) => color !== action.payload
            ),
          },
        };
      }
    case "BUILD_QUERIES":
      return {
        ...state,
        query: { ...state.query, ...action.payload },
      };
    case "COUNT_ITEMS":
      return {
        ...state,
        countItems: action.payload,
      };
    case "RANDOM_ITEMS":
      return {
        ...state,
        randomItems: action.payload,
      };
    case "REMOVE_QUERY":
      return {
        ...state,
        query: {
          ...state.query,
          [`${action.payload}`]: "",
        },
      };
    case "ADD_NEW_ITEM":
      return {
        ...state,
        newItemId: action.payload,
      };
    case "ITEM_REVIEWS":
      return {
        ...state,
        itemReviews: action.payload,
      };
    default:
      return state;
  }
}
