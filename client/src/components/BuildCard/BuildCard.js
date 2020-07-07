import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { removeItemWishList } from "../../actions/userAction";

const BuildCard = ({ item, removeItemWishList, key }) => {
  return (
    <div className={"smallCard col-3"} key={key}>
      <div className={"wrapper"}>
        <div className={"wrapper__background"}>
          <span
            className="wrapper__clouse"
            title={"remove from list"}
            onClick={() => removeItemWishList(item.id)}
          >
            <i className={"fa fa-trash-alt"} />
          </span>
          <Link to={`/item/${item.id}`}>
            <div
              className={"wrapper__img"}
              style={{
                backgroundImage: `url(http://localhost:6500/${item.url})`,
              }}
            />
          </Link>
        </div>
        <Link
          to={`/item/${item.id}`}
          style={{ color: "black", textDecoration: "none" }}
        >
          <div className={"d-flex flex-column item-content"}>
            <label>{item.name.substr(0, 17)}</label>
            <label>$ {item.price}</label>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default connect(null, { removeItemWishList })(BuildCard);
