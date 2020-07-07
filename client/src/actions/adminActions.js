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

export const fetchAllUsers = () => async (dispatch) => {
  try {
    const result = await fetcher.get(`http://localhost:6500/users/admin/users`);
    const allUsers = result.data.allUsers;
    return dispatch({
      type: "FETCH_ALL_USERS",
      payload: allUsers,
    });
  } catch (error) {
    throw new Error(`get token user failed with error: ${error}`);
  }
};

export const fetchAllItems = () => async (dispatch) => {
  try {
    const result = await fetcher.get(`http://localhost:6500/users/admin/items`);
    const allItems = result.data.allItems;
    return dispatch({
      type: "FETCH_ALL_ITEMS",
      payload: allItems,
    });
  } catch (error) {
    throw new Error(`get token user failed with error: ${error}`);
  }
};

export const adminUpdateItem = (byId, data) => async (dispatch) => {
  try {
    const result = await fetcher.put(
      `http://localhost:6500/items/item/update/${byId}`,
      data
    );
    const item = result.data.item[0];
    return dispatch({
      type: "FETCH_SINGLE_ITEM",
      payload: item,
    });
  } catch (error) {
    throw new Error(`Can update user failed with error: ${error}`);
  }
};

export const adminAddItem = (data) => async (dispatch) => {
  try {
    const result = await fetcher.post(
      `http://localhost:6500/items/item/admin/add-item`,
      data
    );
    const item = result.data.itemId;
    return dispatch({
      type: "ADD_NEW_ITEM",
      payload: item,
    });
  } catch (error) {
    throw new Error(`Can update user failed with error: ${error}`);
  }
};

export const toAdminPanel = () => (dispatch) => {
  return dispatch({ type: "IS_ADMIN" });
};
