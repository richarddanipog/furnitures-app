import React, { Component } from "react";

class ItemGalleryImages extends Component {
  render() {
    const { item } = this.props;
    const images = (img, key) => {
      return (
        <div className={`carousel-item ${key < 1 ? "active" : ""}`} key={key}>
          <div
            className="carousel-item__img d-block"
            style={{ backgroundImage: `url(http://localhost:6500/${img})` }}
          ></div>
        </div>
      );
    };

    const indicatorsImages = (img, i) => {
      return (
        <div
          data-target="#carouselExampleIndicators"
          data-slide-to={`${i}`}
          className={`${i < 1 ? "active" : "hi"}`}
          key={i}
        >
          <img src={`http://localhost:6500/${img}`} alt="b" />
        </div>
      );
    };

    return (
      <div id={"gallery"}>
        <div className={"gallery-name d-flex justify-content-between"}>
          <span>{item.name}</span>
          <span
            onClick={() => this.props.onOpenGallery()}
            style={{ cursor: "pointer" }}
          >
            <i className="fa fa-times" />
          </span>
        </div>
        <div
          id="carouselExampleIndicators"
          className="carousel slide"
          data-ride="carousel"
          data-interval="false"
        >
          <div className="carousel-inner">
            <div className="carousel-inner">
              {Object.keys(item).length !== 0 &&
                item.images.split(",").map((img, k) => images(img, k))}
            </div>
          </div>
        </div>

        <div className="carousel-indicators">
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
          {Object.keys(item).length !== 0 &&
            item.images.split(",").map((img, k) => indicatorsImages(img, k))}
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
      </div>
    );
  }
}

export default ItemGalleryImages;
