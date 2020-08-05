import React, { useState } from "react";
import { Link } from "react-router-dom";
import { addItemToShoppingCart } from "../../actions/itemActions";
import { additemWishList } from "../../actions/userAction";
import { connect } from "react-redux";
import RatingStars from "./RatingStars";

const Gallery = (props) => {
  const [addBotton, setAddBotton] = useState(0);
  const [addWish, setAddWish] = useState(0);
  const [existWish, setExistWish] = useState(0);
  const { items, user } = props;

  const toggleIcon = (byId) => {
    setAddBotton(byId);
    setTimeout(() => {
      setAddBotton(0);
    }, 1000);
  };

  const addToWishList = (roleId, itemId) => {
    const checkInWishList = props.userWishList.find(
      (item) => item.id === itemId
    );
    if (roleId === 2 && !checkInWishList) {
      props.additemWishList(itemId);
      setAddWish(itemId);
      setTimeout(() => {
        setAddWish(0);
      }, 1000);
    } else {
      setExistWish(itemId);
      setTimeout(() => {
        setExistWish(0);
      }, 1000);
    }
  };

  const buildCards = (item, i) => {
    const images = item.images.split(",");
    return (
      <div
        className={`gallery-wrapper col-sm-12 col-md-4 col-lg-3 mb-5 position-relative item-${i}`}
        key={item.id}
      >
        <div className={"gallery-card"}>
          <Link to={`/item/${item.id}`}>
            <div
              className={"gallery-card__image"}
              style={{
                backgroundImage: `url(http://localhost:6500/${images[0]})`,
              }}
            />

            <div className="gallery-card__text text-left p-2 ">
              <label>{item.name.substr(0, 17)}</label>
              <span>price : ${item.price}</span>
            </div>
          </Link>
          {user ? (
            <svg
              onClick={() => addToWishList(user.role_id, item.id, user.id)}
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="30"
              viewBox="0 0 24 24"
            >
              <path d="M19.5 10c-2.483 0-4.5 2.015-4.5 4.5s2.017 4.5 4.5 4.5 4.5-2.015 4.5-4.5-2.017-4.5-4.5-4.5zm2.5 5h-2v2h-1v-2h-2v-1h2v-2h1v2h2v1zm-6.527 4.593c-1.108 1.086-2.275 2.219-3.473 3.407-6.43-6.381-12-11.147-12-15.808 0-4.005 3.098-6.192 6.281-6.192 2.197 0 4.434 1.042 5.719 3.248 1.279-2.195 3.521-3.238 5.726-3.238 3.177 0 6.274 2.171 6.274 6.182 0 .746-.156 1.496-.423 2.253-.527-.427-1.124-.768-1.769-1.014.122-.425.192-.839.192-1.239 0-2.873-2.216-4.182-4.274-4.182-3.257 0-4.976 3.475-5.726 5.021-.747-1.54-2.484-5.03-5.72-5.031-2.315-.001-4.28 1.516-4.28 4.192 0 3.442 4.742 7.85 10 13l2.109-2.064c.376.557.839 1.048 1.364 1.465z" />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="30"
              viewBox="0 0 24 24"
            >
              <path d="M19.5 10c-2.483 0-4.5 2.015-4.5 4.5s2.017 4.5 4.5 4.5 4.5-2.015 4.5-4.5-2.017-4.5-4.5-4.5zm2.5 5h-2v2h-1v-2h-2v-1h2v-2h1v2h2v1zm-6.527 4.593c-1.108 1.086-2.275 2.219-3.473 3.407-6.43-6.381-12-11.147-12-15.808 0-4.005 3.098-6.192 6.281-6.192 2.197 0 4.434 1.042 5.719 3.248 1.279-2.195 3.521-3.238 5.726-3.238 3.177 0 6.274 2.171 6.274 6.182 0 .746-.156 1.496-.423 2.253-.527-.427-1.124-.768-1.769-1.014.122-.425.192-.839.192-1.239 0-2.873-2.216-4.182-4.274-4.182-3.257 0-4.976 3.475-5.726 5.021-.747-1.54-2.484-5.03-5.72-5.031-2.315-.001-4.28 1.516-4.28 4.192 0 3.442 4.742 7.85 10 13l2.109-2.064c.376.557.839 1.048 1.364 1.465z" />
            </svg>
          )}

          <label
            className={`gallery-card__wish-list--add ${
              addWish === item.id ? "wish-list__animation1" : ""
            }`}
          >
            <i className={"fa fa-heart"} />
          </label>
          <label
            className={`gallery-card__wish-list--exist ${
              existWish === item.id ? "wish-list__animation2" : ""
            }`}
          />

          <div className="gallery-card__rating text-right mr-3">
            {user && user.role_id === 2 && (
              <i
                className="fas fa-cart-arrow-down mr-2"
                title={"add to cart"}
                onClick={() => {
                  props.addItemToShoppingCart({ id: item.id });
                  toggleIcon(item.id);
                  return false;
                }}
              >
                <label
                  className={`gallery-card__rating--icon ${
                    addBotton === item.id ? "add-animation" : ""
                  }`}
                >
                  &#10004;
                </label>
              </i>
            )}
            <RatingStars />
          </div>
        </div>
      </div>
    );
  };

  return (
    <section className={"gallery container"}>
      <div>
        <div className={"row m-0"}>
          {items.map((item, i) => buildCards(item, i))}
        </div>
      </div>
    </section>
  );
};

const mapStateToProps = (state) => ({
  user: state.user.user,
  shoppingCart: state.items.shoppingCart,
  userWishList: state.user.userWishList,
});

export default connect(mapStateToProps, {
  addItemToShoppingCart,
  additemWishList,
})(Gallery);
