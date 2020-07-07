import React from "react";
import { buildQuery } from "../../actions/itemActions";
import { connect } from "react-redux";

const PriceButton = (props) => {
  const onInput = ({ target: { value } }) => {
    const [minPrice, maxPrice] = value.split("-");
    props.buildQuery({ minPrice, maxPrice });
  };

  return (
    <div className="product-search__filters-buttons-price">
      <div
        className={
          "btn-title d-flex justify-content-between align-items-center"
        }
        onClick={() => props.onButton("price")}
      >
        <span>Price</span>
        {props.toggleButton === "price" ? (
          <span>
            <i className="fas fa-chevron-down" />
          </span>
        ) : (
          <span>
            <i className="fas fa-chevron-up" />
          </span>
        )}
      </div>
      {props.toggleButton === "price" && (
        <div className={"product-search__filters-buttons-price--inner"}>
          <label className="checked_hed">
            <input
              className={"input_check"}
              type="radio"
              value={"-"}
              name={"price"}
              onChange={onInput}
            />{" "}
            All
            <span className="check_box_ex"></span>
          </label>

          <label className="checked_hed">
            <input
              className={"input_check"}
              type="radio"
              value={"-100"}
              name={"price"}
              onChange={onInput}
            />{" "}
            Under $100
            <span className="check_box_ex"></span>
          </label>

          <label className="checked_hed">
            <input
              className={"input_check"}
              type="radio"
              value={"100-300"}
              name={"price"}
              onChange={onInput}
            />{" "}
            $100 - $300
            <span className="check_box_ex"></span>
          </label>

          <label className="checked_hed">
            <input
              className={"input_check"}
              type="radio"
              value={"300-600"}
              name={"price"}
              onChange={onInput}
            />{" "}
            $300 - $600
            <span className="check_box_ex"></span>
          </label>

          <label className="checked_hed">
            <input
              className={"input_check"}
              type="radio"
              value={"600-900"}
              name={"price"}
              onChange={onInput}
            />{" "}
            $600 - $900
            <span className="check_box_ex"></span>
          </label>

          <label className="checked_hed">
            <input
              className={"input_check"}
              type="radio"
              value={"900-"}
              name={"price"}
              onChange={onInput}
            />{" "}
            $900 +<span className="check_box_ex"></span>
          </label>
        </div>
      )}
    </div>
  );
};

export default connect(null, { buildQuery })(PriceButton);
