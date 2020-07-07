import React, { Component } from "react";
import { connect } from "react-redux";
import { randomItems } from "../../actions/itemActions";

class SuggestionItems extends Component {
  componentDidMount() {
    this.props.randomItems(18);
  }
  render() {
    const { randoms } = this.props;

    const buildCard = (singleItem, i) => {
      const img = singleItem.images.split(",")[0];
      return (
        <div
          className={" col-4 col-md-2 d-flex justify-content-center p-3"}
          key={i}
        >
          <a href={`/item/${singleItem.id}`}>
            <div className={"suggestions__carousel-row--card"}>
              <div
                className={"img"}
                style={{ backgroundImage: `url(http://localhost:6500/${img})` }}
              ></div>
              <label>{singleItem.name.substr(0, 15)}</label>
            </div>
          </a>
        </div>
      );
    };

    const rowItems = (items) => {
      return (
        <div className="row">{items.map((item, i) => buildCard(item, i))}</div>
      );
    };

    return (
      <div className="suggestions">
        <h4>Featured Recommendations</h4>
        <div className="suggestions__carousel">
          <div
            id="demo"
            className="carousel slide"
            data-ride="carousel"
            data-interval="false"
          >
            <div className="carousel-inner p-4">
              <div className="suggestions__carousel-row carousel-item row active">
                {randoms.length && rowItems(randoms.slice(0, 6))}
              </div>

              <div className="suggestions__carousel-row carousel-item row">
                {randoms.length && rowItems(randoms.slice(6, 12))}
              </div>

              <div className="suggestions__carousel-row carousel-item row">
                {randoms.length && rowItems(randoms.slice(12))}
              </div>
            </div>
            <a className="carousel-control-prev" href="#demo" data-slide="prev">
              <span className="carousel-control-prev-icon"></span>
            </a>
            <a className="carousel-control-next" href="#demo" data-slide="next">
              <span className="carousel-control-next-icon"></span>
            </a>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  randoms: state.items.randomItems,
});

export default connect(mapStateToProps, { randomItems })(SuggestionItems);
