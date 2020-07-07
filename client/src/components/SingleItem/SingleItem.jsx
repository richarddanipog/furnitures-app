import React, { Component } from "react";
import {
  fetchSingleItem,
  addItemToShoppingCart,
} from "../../actions/itemActions";

import ItemGalleryImages from "./ItemGalleryImages";
import { connect } from "react-redux";
import SuggestionItems from "../Gallery/SuggestionItems";
import ShippingPolicy from "./ShippingPolicy";
import ItemReviews from "./ItemReviews";
import { setModalShow } from "../../actions/userAction";

class SingleItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openGallery: false,
    };
  }

  componentDidMount() {
    window.scrollTo(0, 0);
    this.props.fetchSingleItem(this.props.match.params.id);
  }

  onOpenGallery = () => {
    this.setState({
      openGallery: !this.state.openGallery,
    });
  };

  render() {
    const { item, user, setModalShow } = this.props;
    const { openGallery } = this.state;

    const images = (img, key) => {
      return (
        <div className={`carousel-item ${key < 1 ? "active" : ""}`} key={key}>
          <div
            className="carousel-item__img d-block"
            style={{ backgroundImage: `url(http://localhost:6500/${img})` }}
            onClick={() => this.onOpenGallery()}
          ></div>
        </div>
      );
    };
    const indicatorsImages = (img, i) => {
      return (
        <div
          data-target="#carouselExampleIndicators"
          data-slide-to={`${i}`}
          className={`${i < 1 ? "active" : ""}`}
          key={i}
          style={{ backgroundImage: `url(http://localhost:6500/${img})` }}
        ></div>
      );
    };

    return (
      <div className={"single-item pt-4"}>
        {openGallery && (
          <ItemGalleryImages item={item} onOpenGallery={this.onOpenGallery} />
        )}

        <div id={"carousel"}>
          <div
            id="carouselExampleIndicators"
            className="mt-5 mb-5 carousel carousel-single-items slide"
            data-ride="carousel"
          >
            <div className={"row pl-5 pr-5"}>
              <div className={"col-12 col-md-8 mt-5 d-flex"}>
                <div className="carousel-inner">
                  {Object.keys(item).length !== 0 &&
                    item.images.split(",").map((img, k) => images(img, k))}
                  <a
                    className="carousel-control-prev"
                    href="#carouselExampleIndicators"
                    role="button"
                    data-slide="prev"
                  >
                    <span
                      className="carousel-control-prev-icon"
                      aria-hidden="true"
                    ></span>
                    <span className="sr-only">Previous</span>
                  </a>
                  <a
                    className="carousel-control-next"
                    href="#carouselExampleIndicators"
                    role="button"
                    data-slide="next"
                  >
                    <span
                      className="carousel-control-next-icon"
                      aria-hidden="true"
                    ></span>
                    <span className="sr-only">Next</span>
                  </a>
                </div>
                <div className="carousel-indicators">
                  {Object.keys(item).length !== 0 &&
                    item.images
                      .split(",")
                      .slice(0, 4)
                      .map((img, k) => indicatorsImages(img, k))}
                </div>
              </div>
              <div className={"col-12 col-md-4 mt-5"}>
                <div className={"item-details"}>
                  <div className={"mb-3"}>
                    <h1 className={"item-details__header"}>{item.name}</h1>
                    <hr />
                    <label>
                      Price : <span> $ {item.price}</span>
                    </label>
                    <label>Quantity : {item.quantity}</label>
                    {item.quantity < 1 ? (
                      <div className={"buying-section"}>
                        <label className={"item-details__quantity-1"}>
                          OUT OFF STOCK.
                        </label>
                        {user && user.role_id === 2 ? (
                          <button className={"btn mt-2"}>Contact us</button>
                        ) : (
                          <button className={"btn mt-2"}>Contact us</button>
                        )}
                      </div>
                    ) : (
                      <div className={"buying-section"}>
                        <label className={"item-details__quantity-2"}>
                          In Stock
                        </label>
                        {user && user.role_id === 2 ? (
                          <button
                            className={" mt-2"}
                            onClick={() =>
                              this.props.addItemToShoppingCart({ id: item.id })
                            }
                          >
                            Add to Cart
                          </button>
                        ) : (
                          <button className={" mt-2"} onClick={setModalShow}>
                            Add to Cart
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                  <div>
                    <label>Specifications</label>
                    <ul className={"item-details__specifications"}>
                      <li>Heigth: </li>
                      <li>Width: </li>
                      <li>Material: </li>
                      <li>Color: {item.color}</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={"single-item__description"}>
          <h3>DESCRIPTION</h3>
          <p>{item.description}</p>
        </div>

        <ShippingPolicy />
        <ItemReviews item_id={this.props.match.params.id} user={user} />
        <SuggestionItems />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  item: state.items.item,
  user: state.user.user,
});

export default connect(mapStateToProps, {
  fetchSingleItem,
  addItemToShoppingCart,
  setModalShow,
})(SingleItem);
