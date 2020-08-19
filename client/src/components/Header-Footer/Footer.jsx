import React, { Component } from "react";

class Footer extends Component {
  render() {
    return (
      <footer className={`footer`}>
        <div className="row container">
          <div className="footer-social col-lg-6 col-s-12 mt-5 d-flex">
            <div>
              <h1 className={"mb-5"}>Contact Us</h1>
              <span>
                <i className={"fab fa-instagram"}></i>
              </span>
              <span>
                <i className={"fab fa-facebook-f"}></i>
              </span>
              <span>
                <i className={"fab fa-pinterest-p"}></i>
              </span>
              <span>
                <i className={"fab fa-twitter"}></i>
              </span>
            </div>
          </div>

          <div className={"col-lg-6 col-s-12 mt-5"}>
            <h1>Be the first to know…</h1>
            <p>Sign up for emails packed with finds and inspiration</p>
            <form className="footer-form">
              <input
                type="email"
                className={"footer-form__email"}
                placeholder={"Enter Your Email Address"}
                require={"true"}
              />
              <input
                type="submit"
                className={"footer-form__btn"}
                value={"Submit"}
              />
            </form>
          </div>
        </div>
        <div className="pt-5 pb-2">Copyright © by Richard Danipog</div>
      </footer>
    );
  }
}

export default Footer;
