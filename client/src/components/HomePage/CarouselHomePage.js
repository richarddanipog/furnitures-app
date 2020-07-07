import React from "react";

export default function CarouselHomePage() {
  return (
    <div id="carouselHomePage" className="carousel slide" data-ride="carousel">
      <ol className="carousel-indicators justify-content-start">
        <li
          data-target="#carouselHomePage"
          data-slide-to="0"
          className="active"
        ></li>
        <li data-target="#carouselHomePage" data-slide-to="1"></li>
        <li data-target="#carouselHomePage" data-slide-to="2"></li>
      </ol>
      <div className="carousel-inner">
        <div className="carousel-item active">
          <div className={"main-image"}>
            <img
              className={"main-image__slide-1"}
              src="../../images/h1-slide1-img.png"
              alt="chair"
            />
            <img
              className={"main-image__slide-2"}
              src="../../images/h1-slide2-img1.png"
              alt="chair"
            />
            <img
              className={"main-image__slide-3"}
              src="../../images/h1-slide2-img2.png"
              alt="chair"
            />
            <div className={"main-image__content"}>
              <span>welcome</span>
              <p>
                The next generation product almose never <br /> come from the
                previous generation.
              </p>
            </div>
          </div>
        </div>
        <div className="carousel-item">
          <div className={"main-image"}>
            <img
              className={"main-image__slide-4"}
              src="../../images/chair.png"
              alt="chair"
            />
            <img
              className={"main-image__slide-5"}
              src="../../images/h1-img-2.png"
              alt="chair"
            />
            <img
              className={"main-image__slide-6"}
              src="../../images/h1-img-3.png"
              alt="chair"
            />
            <div className={"main-image__title-page2"}>
              <span>Shop And Fun</span>
              <p>
                Ut enim ad minim veniam, quis nostrud exercitation ullamco
                <br />
                ommodo consequat. Duis aute irure.
              </p>
            </div>
          </div>
        </div>
        <div className="carousel-item">
          <div className={"main-image"}>
            <img
              className={"main-image__slide-7"}
              src="../../images/h1-img-4.png"
              alt="chair"
            />

            <img
              className={"main-image__slide-9"}
              src="../../images/h1-img-6.png"
              alt="chair"
            />
            <div className={"main-image__title-page3"}>
              <span>All For Your Home</span>
              <p>
                Ut enim ad minim veniam, quis nostrud exercitation ullamco
                <br />
                ommodo consequat. Duis aute irure.ommodo consequat. Duis aute
                irure.
              </p>
            </div>
          </div>
        </div>
      </div>
      <a
        className="carousel-control-prev"
        href="#carouselHomePage"
        role="button"
        data-slide="prev"
      >
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="sr-only">Previous</span>
      </a>
      <a
        className="carousel-control-next"
        href="#carouselHomePage"
        role="button"
        data-slide="next"
      >
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="sr-only">Next</span>
      </a>
    </div>
  );
}
