import React, { Component } from "react";
import {
  fetchUserLogin,
  signUp,
  inputChange,
  setModalShow,
} from "../../actions/userAction";
import { connect } from "react-redux";
import ModalBootstrap from "react-bootstrap/Modal";
import Cookie from "js-cookie";

class ModalLogIn extends Component {
  aprrovedUser = () => {
    const { fetchUserLogin, email, password } = this.props;
    fetchUserLogin({ email, password });
  };

  componentDidUpdate(prevProps) {
    const { setModalShow, user, login } = this.props;
    if (user !== prevProps.user && user !== undefined) {
      //user aprroved
      if (!Cookie.get("token") || (this.props.userTokenAuth && login)) {
        setModalShow();
      }
    }
  }

  render() {
    const { inputChange, login, setModalShow } = this.props;

    return (
      <>
        <ModalBootstrap
          size="md"
          show={login}
          onHide={() => setModalShow()}
          aria-labelledby="example-modal-sizes-title-sm"
          centered
        >
          <ModalBootstrap.Body className={"p-0"}>
            <div className={"modal-menu"}>
              <div className="modal-menu__login">
                <img
                  id={"login-img"}
                  src="http://localhost:6500/images/items/mainLogo.png"
                  alt="logo"
                />
                <h2>Sign In to Furnitures Account</h2>
                <div className={"modal-menu__login--input"}>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    onChange={inputChange}
                    placeholder={"Email address (required)"}
                  />
                  <br />
                </div>
                <div className={"modal-menu__login--input"}>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    onChange={inputChange}
                    placeholder={"Password (required)"}
                  />
                </div>
                {this.props.invalid && (
                  <span className={"modal-menu__invalid"}>
                    Invalid email or password.
                  </span>
                )}
                <div className={"modal-menu__login"}>
                  <button className=" mr-4" onClick={() => this.aprrovedUser()}>
                    Login
                  </button>
                  <a href="./" style={{ color: "white" }}>
                    Forgot Password?
                  </a>
                </div>
              </div>
            </div>
          </ModalBootstrap.Body>
        </ModalBootstrap>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  password: state.user.password,
  userTokenAuth: state.user.userTokenAuth,
  user: state.user.user,
  invalid: state.user.invalid,
  approvedSignup: state.user.approvedSignup,
  login: state.user.login,
});

export default connect(mapStateToProps, {
  fetchUserLogin,
  signUp,
  inputChange,
  setModalShow,
})(ModalLogIn);
