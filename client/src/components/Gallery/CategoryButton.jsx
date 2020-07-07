import React from "react";
import { buildQuery } from "../../actions/itemActions";
import { connect } from "react-redux";

const CategoryButton = (props) => {
  const onInput = ({ target: { name, value } }) => {
    props.buildQuery({ [name]: value, page: 1 });
  };

  return (
    <div className="product-search__filters-buttons-price">
      <div
        className={
          "btn-title d-flex justify-content-between align-items-center"
        }
        onClick={() => props.onButton("Category")}
      >
        <span>Category</span>
        {props.toggleButton === "Category" ? (
          <span>
            <i className="fas fa-chevron-down" />
          </span>
        ) : (
          <span>
            <i className="fas fa-chevron-up" />
          </span>
        )}
      </div>
      {props.toggleButton === "Category" && (
        <div className={"product-search__filters-buttons-price--inner"}>
          <label className="checked_hed">
            <input
              className={"input_check"}
              type="radio"
              value={"indoor"}
              name={"categories"}
              onChange={onInput}
            />{" "}
            Indoor
            <span className="check_box_ex"></span>
          </label>

          <label className="checked_hed">
            <input
              className={"input_check"}
              type="radio"
              value={"outdoor"}
              name={"categories"}
              onChange={onInput}
            />{" "}
            Outdoor
            <span className="check_box_ex"></span>
          </label>

          <label className="checked_hed">
            <input
              className={"input_check"}
              type="radio"
              value={"decor"}
              name={"categories"}
              onChange={onInput}
            />{" "}
            Decor
            <span className="check_box_ex"></span>
          </label>

          <label className="checked_hed">
            <input
              className={"input_check"}
              type="radio"
              value={"kitchen"}
              name={"categories"}
              onChange={onInput}
            />{" "}
            Kitchen
            <span className="check_box_ex"></span>
          </label>

          <label className="checked_hed">
            <input
              className={"input_check"}
              type="radio"
              value={"total"}
              name={"categories"}
              onChange={onInput}
            />{" "}
            All items
            <span className="check_box_ex"></span>
          </label>
        </div>
      )}
    </div>
  );
};

export default connect(null, { buildQuery })(CategoryButton);
