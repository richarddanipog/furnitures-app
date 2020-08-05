import React, { Component } from "react";
import Gallery from "../Gallery/Gallery";
import CartButtonFixed from "../Gallery/CartButtonFixed";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { randomItems } from "../../actions/itemActions";
import CarouselHomePage from "./CarouselHomePage";

class HomePage extends Component {
  componentDidMount() {
    window.scrollTo(0, 0);
    this.props.randomItems(12);
  }

  render() {
    const { randoms } = this.props;
    const buildGrid = (item, k) => {
      return (
        <div className={`col-6 col-lg-3 section-shop__images-single`} key={k}>
          <Link
            to={`/item/${item.id}`}
            style={{ textDecoration: "none", color: "#000" }}
          >
            <img
              src={`http://localhost:6500/${item.images.split(",")[0]}`}
              alt="product"
              width="100%"
              height="100%"
            />
            <span className="section-shop__product-name">{item.name}</span>
          </Link>
        </div>
      );
    };
    return (
      <div>
        <CarouselHomePage />
        <section className="section-shop pt-5 container">
          <div className="p-5">
            <h2>Shopping everyday</h2>
            <p>
              Alienum phaedrum torquatos nec eu, vis detraxit ertssa periculiser
              ex, nihil
              <br /> expetendis in meinerst gers frust bura erbu ders
            </p>
          </div>
          <div className="section-shop__images row mt-5">
            {randoms
              .slice(0, randoms.length - 4)
              .map((item, index) => buildGrid(item, index))}
          </div>
          <p id={"swipe"}>&#9754; Swipe &#9755;</p>
        </section>
        <div
          className={" text-center p-5"}
          style={{ backgroundColor: "#fafafa" }}
        >
          <h4 className={"gallery-header"}>BEST SELLING PRODUCTS</h4>
        </div>
        <Gallery items={randoms.slice(randoms.length - 4)} />
        <section className="direction-to-gallery">
          <div
            className={"d-flex justify-content-center align-items-center"}
            style={{
              backgroundImage: "url(../../images/background-img.jpg) ",
              height: "65vh",
              backgroundSize: "cover",
              backgroundAttachment: "fixed",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
            }}
          >
            <div className={"text-center"}>
              <h4>Time To Explore</h4>
              <h2>
                We are creators of high quality Indoor & Outdoor Furniture.
              </h2>
              <Link to={`/categories`}>
                <button className="direction-to-gallery__btn mt-5">SHOP</button>
              </Link>
            </div>
          </div>
        </section>

        <CartButtonFixed />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  randoms: state.items.randomItems,
});

export default connect(mapStateToProps, { randomItems })(HomePage);
