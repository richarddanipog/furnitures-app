import React, { Component } from "react";
import { Link } from "react-router-dom";
import {
  fetchUserDetails,
  removeItemFromBag,
  logOut,
  getUserWishList,
  setModalShow,
} from "../../actions/userAction";
import { userShoppingCart } from "../../actions/itemActions";
import { toAdminPanel } from "../../actions/adminActions";
import ModalLogIn from "./Modal";
import HamburgerMenu from "./HamburgerMenu";
import { connect } from "react-redux";
import Cookie from "js-cookie";

class Header extends Component {
  async componentDidUpdate(prevProps) {
    const {
      userTokenAuth,
      fetchUserDetails,
      shoppingCart,
      userShoppingCart,
    } = this.props;
    if (
      userTokenAuth !== prevProps.userTokenAuth &&
      userTokenAuth !== undefined
    ) {
      fetchUserDetails(userTokenAuth);
    } else if (userTokenAuth === undefined) {
      Cookie.remove("token");
    } else if (shoppingCart.length !== prevProps.shoppingCart.length) {
      userShoppingCart();
    }
  }

  componentDidMount() {
    const { fetchUserDetails, userShoppingCart, getUserWishList } = this.props;
    if (Cookie.get("token")) {
      fetchUserDetails();
      userShoppingCart();
      getUserWishList();
    }
  }

  render() {
    const { user, logOut, shoppingCart, setModalShow } = this.props;

    return (
      <header>
        <div className={`header`}>
          <div className="header-nav row align-items-center">
            <div className={"companyName col-sm-12 col-md-3 "}>
              <Link to={"/"} style={{ color: "#000", textDecoration: "none" }}>
                <img
                  src="http://localhost:6500/images/items/mainLogo.png"
                  alt="logo website"
                />
                <h4
                  className={"header-logo"}
                  style={{ display: "inline-block" }}
                >
                  furnitures
                </h4>
              </Link>
              <HamburgerMenu user={user} setModalShow={setModalShow} />
            </div>

            <div className={"col-5 diabled-element"}>
              <form className={"header-form"}>
                <div>
                  <input
                    className={"header-form__input"}
                    type="text"
                    placeholder={"Find anything home..."}
                  />
                  <input
                    className={"header-form__button"}
                    type="submit"
                    value={"search"}
                  />
                </div>
              </form>
            </div>

            <div className={"count-bag col-4 text-right diabled-element"}>
              {user && user.role_id === 2 ? (
                <div className={"mr-5 position-relative d-inline"}>
                  {shoppingCart.length > 0 ? (
                    <Link
                      to={"/user-account/checkout"}
                      style={{ color: "white" }}
                    >
                      <i
                        className=" fas fa-shopping-cart count-bag__cart"
                        style={{ fontSize: "25px", cursor: "pointer" }}
                      >
                        <span className="count-bag__num">
                          {shoppingCart.length}
                        </span>
                      </i>
                    </Link>
                  ) : (
                    <i
                      className="fas fa-shopping-cart count-bag__cart"
                      style={{ fontSize: "25px", cursor: "pointer" }}
                    />
                  )}
                </div>
              ) : (
                <>
                  {user && user.role_id === 1 ? (
                    <span
                      className={"mr-5"}
                      onClick={this.props.toAdminPanel}
                      style={{ cursor: "pointer" }}
                    >
                      Admin
                    </span>
                  ) : (
                    <span className={"mr-5"} onClick={setModalShow}>
                      <i
                        className=" fas fa-shopping-cart"
                        style={{ fontSize: "25px", cursor: "pointer" }}
                      ></i>
                    </span>
                  )}
                </>
              )}

              {user && (
                <div className={"d-inline-block"}>
                  <span>
                    hello,
                    <Link
                      to={`${user.role_id === 2 ? "/user-account" : ""}`}
                      style={{ textDecoration: "none", color: "#fc3" }}
                    >
                      <b>{user.first_name}</b>
                    </Link>
                  </span>
                  <Link
                    to={"/"}
                    style={{ color: "white", textDecoration: "none" }}
                  >
                    <span
                      className={"ml-4"}
                      style={{ cursor: "pointer" }}
                      onClick={() => logOut()}
                    >
                      Log Out
                    </span>
                  </Link>
                </div>
              )}

              {user == null && (
                <span
                  className={"mr-5"}
                  style={{ cursor: "pointer" }}
                  onClick={setModalShow}
                >
                  <i className="fas fa-user mr-2" />
                  Log in
                </span>
              )}

              {user == null && (
                <Link
                  to={"/signup"}
                  style={{ color: "white", textDecoration: "none" }}
                >
                  <span className={"mr-5"} style={{ cursor: "pointer" }}>
                    <i className="fas fa-user-plus mr-2" />
                    Sign up
                  </span>
                </Link>
              )}

              <ModalLogIn user={user} />
            </div>
          </div>
        </div>
      </header>
    );
  }
}
const mapStateToProps = (state) => ({
  userTokenAuth: state.user.userTokenAuth,
  user: state.user.user,
  shoppingCart: state.items.shoppingCart,
  login: state.user.login,
});

export default connect(mapStateToProps, {
  fetchUserDetails,
  removeItemFromBag,
  logOut,
  userShoppingCart,
  getUserWishList,
  setModalShow,
  toAdminPanel,
})(Header);
