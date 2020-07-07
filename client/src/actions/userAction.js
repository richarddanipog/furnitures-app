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

export const fetchUserLogin = (data) => async (dispatch) => {
  try {
    const result = await fetcher.post(
      `http://localhost:6500/users/login`,
      data
    );
    const token = result.data.accessToken;
    return dispatch({
      type: "FETCH_USER_TOKEN",
      payload: token,
    });
  } catch (error) {
    return dispatch({
      type: "INVALID_TOKEN",
      payload: true,
    });
  }
};

export const fetchUserDetails = () => async (dispatch) => {
  try {
    const result = await fetcher.post(`http://localhost:6500/users/user`);
    const user = result.data.user;
    return dispatch({
      type: "FETCH_USER_DETAILS",
      payload: user,
    });
  } catch (error) {
    throw new Error(`get Items failed with error: ${error}`);
  }
};

export const signUp = (data) => async (dispatch) => {
  try {
    await fetcher.post(`http://localhost:6500/users/signup`, data);
    return dispatch({
      type: "USER_SIGNUP",
      payload: true,
    });
  } catch (error) {
    return dispatch({
      type: "USER_SIGNUP",
      payload: false,
    });
  }
};

export const userUpdateProfile = (data) => async (dispatch) => {
  try {
    const result = await fetcher.put(
      `http://localhost:6500/users/user/edit`,
      data
    );
    const user = result.data.user[0];
    return dispatch({
      type: "FETCH_USER_DETAILS",
      payload: user,
    });
  } catch (error) {
    throw new Error(`Can update user failed with error: ${error}`);
  }
};

export const getUserWishList = () => async (dispatch) => {
  try {
    const result = await fetcher.post(
      `http://localhost:6500/users/user/wish-list`
    );
    const wishList = result.data.wishList;
    return dispatch({
      type: "USER_WISH_LIST",
      payload: wishList,
    });
  } catch (error) {
    throw new Error(`Can get user Wish list failed with error: ${error}`);
  }
};

export const additemWishList = (item_id) => async (dispatch) => {
  try {
    const result = await fetcher.post(
      `http://localhost:6500/users/user/wish-list/add`,
      { item_id }
    );
    const newWishList = result.data.wishList;
    return dispatch({
      type: "USER_WISH_LIST",
      payload: newWishList,
    });
  } catch (error) {
    throw new Error(`Can get user Wish list failed with error: ${error}`);
  }
};

export const removeItemWishList = (item_id) => async (dispatch) => {
  try {
    const result = await fetcher.delete(
      `http://localhost:6500/users/user/wish-list/remove/${item_id}`,
      {
        data: item_id,
      }
    );
    const newWishList = result.data.wishList;
    return dispatch({
      type: "USER_WISH_LIST",
      payload: newWishList,
    });
  } catch (error) {
    throw new Error(`Can get user Wish list failed with error: ${error}`);
  }
};

export const inputChange = ({ target: { name, value } }) => async (
  dispatch
) => {
  return dispatch({ type: "HANDLE_CHANGE", payload: { name, value } });
};

export const logOut = () => async (dispatch) => {
  return dispatch({
    type: "USER_LOGOUT",
    payload: null,
  });
};

export const removeItemFromBag = (itemId) => async (dispatch) => {
  return dispatch({
    type: "REMOVE_ITEM_FROM_BAG",
    payload: itemId,
  });
};

export const setModalShow = (e) => (dispatch) => {
  if (e) e.preventDefault();

  return dispatch({ type: "LOGIN" });
};
