import React, { useState } from "react";
import Account from "./Account";
import Gallery from "../Gallery/Gallery";
import WishList from "./WishList";

import { connect } from "react-redux";

const UserProfile = (props) => {
  const [openCell, setOpenCell] = useState("wishlist");

  const toggleCell = (type) => {
    setOpenCell(type);
  };

  return (
    <section className={"profile pt-5"}>
      <h1 className={"ml-5 "}>Profile : </h1>
      <div className="account-zone">
        <div className="row">
          <div className="col-sm-12 col-md-4">
            <div
              className={"account-zone__cell"}
              onClick={() => toggleCell("orders")}
            >
              <div>
                <img
                  src={"http://localhost:6500/images/items/orders.png"}
                  alt={"boxs"}
                />
              </div>
              <div className={"p-3"}>
                <h4>Your Order</h4>
                <p>Track, return, or check out</p>
              </div>
            </div>
          </div>
          <div className="col-sm-12 col-md-4">
            <div
              className={"account-zone__cell"}
              onClick={() => toggleCell("wishlist")}
            >
              <div>
                <img
                  src={"http://localhost:6500/images/items/wishlist.png"}
                  alt={"boxs"}
                />
              </div>
              <div className={"p-3"}>
                <h4>Save For Later</h4>
                <p>Items that you save.</p>
              </div>
            </div>
          </div>
          <div className="col-sm-12 col-md-4">
            <div
              className={"account-zone__cell"}
              onClick={() => toggleCell("edit")}
            >
              <div>
                <img
                  src={"http://localhost:6500/images/items/security.png"}
                  alt={"boxs"}
                />
              </div>
              <div className={"p-3"}>
                <h4>Login & security</h4>
                <p>Edit login, name, password </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {openCell === "orders" && (
        <div className={"account-zone__orders p-5"}>
          <h1>orders</h1>
          {props.shoppingCart.length > 0 ? (
            <Gallery items={props.shoppingCart} />
          ) : (
            <div className={"text-center p-5"}>
              <img
                src="../../images/web_search.png"
                alt="search"
                width={"20%"}
              />
              <h2>You don't order anything...</h2>
            </div>
          )}
        </div>
      )}

      {openCell === "edit" && <Account user={props.user} />}

      {openCell === "wishlist" && <WishList user={props.user} />}
    </section>
  );
};

const mapStateToProps = (state) => ({
  userTokenAuth: state.user.userTokenAuth,
  user: state.user.user,
  shoppingCart: state.items.shoppingCart,
});

export default connect(mapStateToProps, null)(UserProfile);
