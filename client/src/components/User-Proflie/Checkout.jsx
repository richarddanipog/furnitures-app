import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { removeItemShoppingCart } from "../../actions/itemActions";

const Checkout = (props) => {
  window.scrollTo(0, 0);
  const getTotalCosts = () => {
    return props.shoppingCart.reduce((total, item) => {
      return total + Number(item.price) * item.quantity;
    }, 0);
  };

  const subTotal = getTotalCosts();

  if (props.shoppingCart.length < 1) {
    return (
      <div className={"noItems"}>
        <div className={"text-center"}>
          <h1>you dont have items...0 items in your cart</h1>
          <h4>Go ahead and add something!</h4>
          <Link to={`/categories`}>
            <button className="noItems__btn">let's shop</button>
          </Link>
        </div>
      </div>
    );
  }

  const listOfItems = (item, i) => {
    const images = item.images.split(",");
    return (
      <div className="container shopping-cart__body-items" key={i}>
        <div className="row">
          <div className="col-md-2">
            <img src={`http://localhost:6500/${images[0]}`} alt="item" />
          </div>
          <div className="col-md-9">
            <h5>{item.name}</h5>
            <span style={{ color: "green" }}>In Stock</span>
            <p>Quantity: {item.quantity}</p>
            <label
              className={"remove"}
              onClick={() => props.removeItemShoppingCart(item.id)}
            >
              Remove
            </label>
            <Link
              to={`/item/${item.id}`}
              style={{ color: "grey", marginLeft: "10px" }}
            >
              See Item
            </Link>
          </div>
          <div className="col-md-1 text-right">
            <h3>$ {item.price}</h3>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <div className={"shopping-cart"}>
        <div className="shopping-cart__header d-flex justify-content-between align-items-center">
          <h2>Shopping Cart</h2>
          <span>Price</span>
        </div>
        <div className="shopping-cart__body">
          {props.shoppingCart.map((item, i) => listOfItems(item, i))}
        </div>
      </div>
      <div className="container">
        <div className="row">
          <div className="col-md-6 p-5">
            <div className="position-relative">
              <img src="../../images/home.jpg" alt="living room" width="100%" />
              <Link to={`/categories`}>
                <div className="checkout__search">
                  <div className={"checkout__search-content position-absolute"}>
                    <span>Search for more...</span>
                  </div>
                </div>
              </Link>
            </div>
          </div>
          <div className="col-md-6 p-5">
            <div className="checkout">
              <div className="checkout__body p-3">
                <h5>Est. total</h5>
                <div className={"d-flex justify-content-between"}>
                  <p>Subtotal ({props.shoppingCart.length}):</p>
                  <p> ${subTotal}</p>
                </div>
                <div className={"d-flex justify-content-between"}>
                  <p>delivery :</p>
                  <p> $5.99</p>
                </div>
                <hr />
              </div>

              <div className="shopping-cart__footer mt-5">
                <div className="shopping-cart__footer--proceed-check d-flex justify-content-end">
                  <button>Proceed to checkout</button>
                  <span>
                    Total({props.shoppingCart.length} items) : ${" "}
                    {subTotal + 5.99}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (state) => ({
  userTokenAuth: state.user.userTokenAuth,
  user: state.user.user,
  shoppingCart: state.items.shoppingCart,
});

export default connect(mapStateToProps, { removeItemShoppingCart })(Checkout);
