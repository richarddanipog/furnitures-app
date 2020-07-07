import React from "react";
import { connect } from "react-redux";
import BuildCard from "../BuildCard/BuildCard";
import { removeItemWishList } from "../../actions/userAction";

const WishList = (props) => {
  return (
    <div className="container profile__wishlist p-5">
      <h1>The list of products you saved</h1>
      {props.wishList && props.wishList.length > 0 ? (
        <div className={"row profile__wishlist-gallery"}>
          {props.wishList.map((item, i) => (
            <BuildCard item={item} key={i} />
          ))}
        </div>
      ) : (
        <div className={"text-center p-5"}>
          <img src="../../images/web_search.png" alt="search" width={"20%"} />
          <h2>You don't save anything to Save later list...</h2>
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  wishList: state.user.userWishList,
});

export default connect(mapStateToProps, { removeItemWishList })(WishList);
