import Cookie from "js-cookie";
const axios = require("axios");

const fetcher = axios.create({
  baseURL: `http://localhost:6500`,
  withCredentials: true,
  credentials: "include",
});

fetcher.interceptors.request.use(
  async (config) => {
    const token = await Cookie.get("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);

const getQuery = (query) => {
  let result = "";
  for (const q in query) {
    if (Array.isArray(query[q])) {
      result += `${q}=${query[q].join("+")}&`;
    } else {
      result += `${q}=${query[q]}&`;
    }
  }
  return result;
};

export const fetchItem = (q) => async (dispatch) => {
  try {
    const result = await fetcher.get(
      `http://localhost:6500/items?${getQuery(q)}`
    );
    return dispatch({
      type: "FETCH_ITEMS",
      payload: result.data.items,
    });
  } catch (error) {
    throw new Error(`get Items failed with error: ${error}`);
  }
};

export const countItem = () => async (dispatch) => {
  try {
    const result = await fetcher.get(
      `http://localhost:6500/items/categories/count`
    );
    return dispatch({
      type: "COUNT_ITEMS",
      payload: result.data.countItems[0][0],
    });
  } catch (error) {
    throw new Error(`get Items failed with error: ${error}`);
  }
};

export const randomItems = (numOfProducts) => async (dispatch) => {
  try {
    const result = await fetcher.post(
      `http://localhost:6500/items/home/randoms`,
      { numOfProducts }
    );
    return dispatch({
      type: "RANDOM_ITEMS",
      payload: result.data.randomItems,
    });
  } catch (error) {
    throw new Error(`get Items failed with error: ${error}`);
  }
};

export const fetchSingleItem = (byId) => async (dispatch) => {
  try {
    const result = await fetcher.get(`http://localhost:6500/items/${byId}`);
    return dispatch({
      type: "FETCH_SINGLE_ITEM",
      payload: result.data.item[0],
    });
  } catch (error) {
    throw new Error(`get Items failed with error: ${error}`);
  }
};

export const addItemToShoppingCart = (byId) => async (dispatch) => {
  try {
    await fetcher.post(`http://localhost:6500/items/addItem`, byId);
    return dispatch({
      type: "ADD_ITEM_TO_BAG",
      payload: byId,
    });
  } catch (error) {
    throw new Error(`get Items failed with error: ${error}`);
  }
};

export const removeItemShoppingCart = (byId) => async (dispatch) => {
  try {
    const result = await fetcher.delete(
      `http://localhost:6500/items/removeItem/${byId}`,
      {
        data: byId,
      }
    );
    return dispatch({
      type: "REMOVE_ITEM_FROM_BAG",
      payload: parseInt(result.config.data),
    });
  } catch (error) {
    throw new Error(`get Items failed with error: ${error}`);
  }
};

export const userShoppingCart = () => async (dispatch) => {
  try {
    const result = await fetcher.post(
      `http://localhost:6500/items/user/shopping-cart`
    );
    return dispatch({
      type: "SHOPPING_CART",
      payload: result.data.data,
    });
  } catch (error) {
    throw new Error(`get Items failed with error: ${error}`);
  }
};

export const getItemReviews = (byId) => async (dispatch) => {
  try {
    const result = await fetcher.get(
      `http://localhost:6500/items/item/reviews/${byId}`
    );
    return dispatch({
      type: "ITEM_REVIEWS",
      payload: result.data.itemReviews,
    });
  } catch (error) {
    throw new Error(`get Items failed with error: ${error}`);
  }
};

export const addItemReviews = (data) => async (dispatch) => {
  try {
    const result = await fetcher.post(
      `http://localhost:6500/items/item/reviews`,
      data
    );
    return dispatch({
      type: "ITEM_REVIEWS",
      payload: result.data.itemReviews,
    });
  } catch (error) {
    throw new Error(`get Items failed with error: ${error}`);
  }
};

export const onColorInput = ({ target: { value } }) => (dispatch) => {
  return dispatch({
    type: "CHOOSE_COLORS",
    payload: value,
  });
};

export const buildQuery = (obj) => (dispatch) => {
  return dispatch({
    type: "BUILD_QUERIES",
    payload: obj,
  });
};

export const removePropFromQuery = (propName) => (dispatch) => {
  return dispatch({
    type: "REMOVE_QUERY",
    payload: propName,
  });
};
