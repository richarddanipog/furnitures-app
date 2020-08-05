import React, { Component } from "react";
import { Link } from "react-router-dom";

class Categories extends Component {
  componentDidMount() {
    window.scrollTo(0, 0);
  }

  render() {
    return (
      <div className={"categories"}>
        <div
          className={"categories-background__img"}
          style={{
            backgroundImage: `url(http://localhost:6500/images/items/home-decor.jpg)`,
            backgroundSize: "cover",
            height: "55vh",
            backgroundPosition: "bottom",
          }}
        >
          <h1>Search your perfect items</h1>
          <img
            src={`http://localhost:6500/images/items/recommended.png`}
            alt="like"
          />
        </div>

        <section className={"categories-choices p-5 container"}>
          <div className={"text-center p-4 mb-5"}>
            <h3 style={{ borderBottom: "4px solid #000", display: "inline" }}>
              Choose By Categories
            </h3>
          </div>
          <div className="row">
            <div className={"categories-choices__opition col-12 col-lg-3"}>
              <Link to={`/categories/search-by-category/${"indoor"}`}>
                <div
                  className={"categories-choices__opition-img"}
                  style={{
                    backgroundImage:
                      "url(http://localhost:6500/images/items/indoor.jpg)",
                  }}
                >
                  <span>Indoor</span>
                </div>
              </Link>
            </div>
            <div className={"categories-choices__opition col-12 col-lg-3"}>
              <Link to={`/categories/search-by-category/${"outdoor"}`}>
                <div
                  className={"categories-choices__opition-img"}
                  style={{
                    backgroundImage:
                      "url(http://localhost:6500/images/items/outdoor.jpg)",
                  }}
                >
                  <span>Outdoor</span>
                </div>
              </Link>
            </div>
            <div className={"categories-choices__opition col-12 col-lg-3"}>
              <Link to={`/categories/search-by-category/${"decor"}`}>
                <div
                  className={"categories-choices__opition-img"}
                  style={{
                    backgroundImage:
                      "url(http://localhost:6500/images/items/decor.jpg)",
                  }}
                >
                  <span>Decor</span>
                </div>
              </Link>
            </div>
            <div className={"categories-choices__opition col-12 col-lg-3"}>
              <Link to={`/categories/search-by-category/${"kitchen"}`}>
                <div
                  className={"categories-choices__opition-img"}
                  style={{
                    backgroundImage:
                      "url(http://localhost:6500/images/items/kitchen.png)",
                  }}
                >
                  <span>Kitchen</span>
                </div>
              </Link>
            </div>
            <div className={"categories-choices__opition col-12 col-lg-3"}>
              <Link to={`/categories/search-by-category/${"total"}`}>
                <div
                  className={"categories-choices__opition-img"}
                  style={{
                    backgroundImage:
                      "url(http://localhost:6500/images/items/all.jpg)",
                  }}
                >
                  <span>All</span>
                </div>
              </Link>
            </div>
          </div>

          <p id={"swipe"}>&#9754; Swipe &#9755;</p>
        </section>
        <hr />
        <section className={"suggestion-section container"}>
          <div className={"d-flex flex-column align-items-center text-center"}>
            <h2>Popular Furniture Styles</h2>
            <p style={{ width: "50%" }}>
              Whether you like the laid-back style of a beach house bungalow or
              prefer the sleek sophistication of a Mid-Century Modern rambler,
              we've streamlined our selection to help you find your perfect
              interior design style, for less.{" "}
            </p>
          </div>
          <div className={"suggestion-section__design"}>
            <div className="row p-3 m-0">
              <div className={"col-sm-12 col-md-6"}>
                <img
                  src={"http://localhost:6500/images/items/coastal_design.jpg"}
                  alt="coastal"
                  width={"100%"}
                />
              </div>
              <div className={"col-sm-12 col-md-6 p-5"}>
                <h2>Coastal</h2>
                <p>
                  Bring the fresh sea breeze and carefree whimsy of Coastal
                  design into your home. Whether you live in a seaside home or
                  just love the oceanfront look, Coastal style is easy to
                  achieve with shades of blue,pops of coral, and nautical decor.
                  Embrace beachy textures like rope and driftwood, and create a
                  light, airy atmosphere with white furniture and sheer
                  curtains. Classic nautical patterns like anchors and stripes
                  bring it all together, creating your ideal seaside retreat.{" "}
                </p>
              </div>
            </div>
          </div>

          <div className={"suggestion-section__design pb-5"}>
            <div className="row p-3 m-0">
              <div className={"col-sm-12 col-md-6 p-5 order-1 order-md-0"}>
                <h2>Boho</h2>
                <p>
                  If global flair and eclectic accents are what make your free
                  spirit sing, Boho style is just the look your home needs.
                  Exotic colors meet and earthy texture blend with decorative
                  accessories like wood, tapestries, indoor plants, and natural
                  fibers to create a Boho Design. Comfort is key, so look for
                  flatwoven area rugs and plush throw pillows that feature
                  mandala and southwestern patterns. A Boho color palette
                  embraces jewel tones like rich fuchsia, turquoise, and sunny
                  yellow, and neutrals like grey and cream so it’s both exciting
                  and grounded.
                </p>
              </div>
              <div className={"col-sm-16 col-md-6 order-0 order-md-1"}>
                <img
                  src={"http://localhost:6500/images/items/baho_design.jpg"}
                  alt="coastal"
                  width={"100%"}
                />
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

export default Categories;
