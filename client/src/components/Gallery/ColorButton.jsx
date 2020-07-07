import React, { Component } from "react";
import { connect } from "react-redux";
import { onColorInput } from "../../actions/itemActions";

class ColorButton extends Component {
  render() {
    const { toggleButton, onColorInput, onButton } = this.props;
    return (
      <div className="product-search__filters-buttons-price">
        <div
          className={
            "btn-title d-flex justify-content-between align-items-center"
          }
          onClick={() => onButton("color")}
        >
          <span>Color</span>
          {toggleButton === "color" ? (
            <span>
              <i className="fas fa-chevron-down" />
            </span>
          ) : (
            <span>
              <i className="fas fa-chevron-up" />
            </span>
          )}
        </div>
        {toggleButton === "color" && (
          <div
            className={"product-search__filters-buttons-price--inner container"}
          >
            <div className="row">
              <label className="checked_color">
                <input
                  id={"white"}
                  type="checkbox"
                  value={"white"}
                  name={"color"}
                  onChange={onColorInput}
                />
                <span
                  className="checked_color_ex"
                  style={{ backgroundColor: "white" }}
                ></span>
              </label>
              <label className="checked_color">
                <input
                  id={"grey"}
                  type="checkbox"
                  value={"grey"}
                  name={"color"}
                  onChange={onColorInput}
                />
                <span
                  className="checked_color_ex"
                  style={{ backgroundColor: "grey" }}
                ></span>
              </label>
              <label className="checked_color">
                <input
                  id={"black"}
                  type="checkbox"
                  value={"black"}
                  name={"color"}
                  onChange={onColorInput}
                />
                <span
                  className="checked_color_ex"
                  style={{ backgroundColor: "black" }}
                ></span>
              </label>
              <label className="checked_color">
                <input
                  id={"brown"}
                  type="checkbox"
                  value={"brown"}
                  name={"color"}
                  onChange={onColorInput}
                />
                <span
                  className="checked_color_ex"
                  style={{ backgroundColor: "#A0522D" }}
                ></span>
              </label>
              <label className="checked_color">
                <input
                  id={"blue"}
                  type="checkbox"
                  value={"blue"}
                  name={"color"}
                  onChange={onColorInput}
                />
                <span
                  className="checked_color_ex"
                  style={{ backgroundColor: "steelblue" }}
                ></span>
              </label>
              <label className="checked_color">
                <input
                  id={"green"}
                  type="checkbox"
                  value={"green"}
                  name={"color"}
                  onChange={onColorInput}
                />
                <span
                  className="checked_color_ex"
                  style={{ backgroundColor: "seagreen" }}
                ></span>
              </label>
              <label className="checked_color">
                <input
                  id={"gold"}
                  type="checkbox"
                  value={"gold"}
                  name={"color"}
                  onChange={onColorInput}
                />
                <span
                  className="checked_color_ex"
                  style={{ backgroundColor: "#ffd633" }}
                ></span>
              </label>
              <label className="checked_color">
                <input
                  id={"red"}
                  type="checkbox"
                  value={"red"}
                  name={"color"}
                  onChange={onColorInput}
                />
                <span
                  className="checked_color_ex"
                  style={{ backgroundColor: "#ff4d4d" }}
                ></span>
              </label>
            </div>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  colors: state.items.colors,
  query: state.items.query,
});

export default connect(mapStateToProps, { onColorInput })(ColorButton);
