import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

const CartButtonFixed = (props) => {
  window.onscroll = () => {
    scrollFunction();
  };

  const scrollFunction = () => {
    if (
      (document.body.scrollTop > 300 ||
        document.documentElement.scrollTop > 300) &&
      document.querySelector(".side-button__cart")
    ) {
      document.querySelector(".side-button__cart").style.opacity = "1";
    } else if (document.querySelector(".side-button__cart")) {
      document.querySelector(".side-button__cart").style.opacity = "0";
    }
  };

  return (
    <div className={"side-button__cart diabled-element"}>
      {props.user && props.user.role_id === 2 && (
        <Link
          to={"/user-account/checkout"}
          style={{ color: "#232f3e" }}
          title={"Checkout"}
        >
          <span className="side-button__cart--icon">
            <i
              className=" fas fa-shopping-bag count-bag__cart"
              style={{ fontSize: "25px", cursor: "pointer" }}
            >
              {props.shoppingCart.length > 0 && (
                <span className="side-button__cart--count">
                  {props.shoppingCart.length}
                </span>
              )}
            </i>
          </span>
        </Link>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  shoppingCart: state.items.shoppingCart,
  user: state.user.user,
});

export default connect(mapStateToProps, null)(CartButtonFixed);
