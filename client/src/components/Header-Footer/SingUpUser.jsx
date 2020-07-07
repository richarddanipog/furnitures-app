import React, { Component } from "react";
import { ReactComponent as Logo } from "../../svg-icons/singup.svg";
import validate, { field } from "../Validations/validator";
import InputErrors from "../Validations/inputErrors";
import { connect } from "react-redux";
import { signUp } from "../../actions/userAction";
import { Link } from "react-router-dom";

class SingUpUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      first_name: field({ name: "first_name", isRequired: true, minLength: 4 }),
      last_name: field({ name: "last_name", isRequired: true, minLength: 4 }),
      email: field({
        name: "email",
        isRequired: true,
        pattern: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(.\w{2,3})+$/,
      }),
      phone: field({ name: "phone", isRequired: true, minLength: 10 }),
      address: field({ name: "address", isRequired: true, minLength: 8 }),
      password: field({ name: "password", isRequired: true, minLength: 5 }),
    };
  }

  //Bind the function will use the prototype chain, Ya'ani - 1 method per class
  inputChange = ({ target: { name, value } }) => {
    const errors = validate(name, value, this.state[name].validations);
    this.setState({
      [name]: {
        ...this.state[name],
        value,
        errors,
      },
    });
  };

  //Each object will have this onSubmit method - Ya'ani - 1 method per object!  A copy
  onSubmit = (e) => {
    e.preventDefault();
    let isOK = true;
    for (let prop in this.state) {
      const field = this.state[prop];
      const errors = validate(prop, field.value, field.validations);
      if (errors.length) {
        isOK = false;
        this.setState({
          [prop]: {
            ...this.state[prop],
            errors,
          },
        });
      }
    }

    if (isOK) {
      const result = {};
      for (let prop in this.state) {
        result[prop] = this.state[prop].value;
      }

      //Send the data somewhere
      const user = {
        first_name: this.state.first_name.value,
        last_name: this.state.last_name.value,
        email: this.state.email.value,
        password: this.state.password.value,
        phone: this.state.phone.value,
        address: this.state.address.value,
      };
      this.props.signUp(user);
    }
  };

  render() {
    const { approvedSignup } = this.props;
    return (
      <div className={"signup"}>
        {!approvedSignup ? (
          <div className={"signup__card mb-5"}>
            <h4 className="alert-heading text-center">Sing up, welcome!</h4>
            <p className="text-center">
              Hello User! Please fill in your details
            </p>
            <form onSubmit={this.onSubmit}>
              <div className="row form-group">
                <div className="col-md-12 mb-4">
                  <label htmlFor="exampleInputEmail1">First Name</label>
                  <input
                    type="text"
                    name="first_name"
                    className="form-control"
                    placeholder="Enter First Name"
                    onBlur={this.inputChange}
                  ></input>
                  <InputErrors
                    errors={this.state.first_name.errors}
                  ></InputErrors>
                </div>
                <div className="col-md-12 mb-4">
                  <label htmlFor="exampleInputEmail1">Last Name</label>
                  <input
                    type="text"
                    name="last_name"
                    className="form-control"
                    placeholder="Enter Last Name"
                    onBlur={this.inputChange}
                  ></input>
                  <InputErrors
                    errors={this.state.last_name.errors}
                  ></InputErrors>
                </div>
                <div className="col-md-12 mb-4">
                  <label htmlFor="exampleInputEmail1">Email</label>
                  <input
                    type="text"
                    name="email"
                    className="form-control"
                    placeholder="Enter Email"
                    onBlur={this.inputChange}
                  ></input>
                  <InputErrors errors={this.state.email.errors}></InputErrors>
                </div>
                <div className="col-md-12 mb-4">
                  <label htmlFor="exampleInputEmail1">Phone</label>
                  <input
                    type="text"
                    name="phone"
                    className="form-control"
                    placeholder="Enter Phone"
                    onBlur={this.inputChange}
                  ></input>
                  <InputErrors errors={this.state.phone.errors}></InputErrors>
                </div>
                <div className="col-md-12 mb-4">
                  <label htmlFor="exampleInputEmail1">Address</label>
                  <input
                    type="text"
                    name="address"
                    className="form-control"
                    placeholder="Enter Address"
                    onBlur={this.inputChange}
                  ></input>
                  <InputErrors errors={this.state.address.errors}></InputErrors>
                </div>
                <div className="col-md-12 mb-4">
                  <label htmlFor="exampleInputEmail1">Password</label>
                  <input
                    type="password"
                    name="password"
                    className="form-control"
                    placeholder="Enter Password"
                    onBlur={this.inputChange}
                  ></input>
                  <InputErrors
                    errors={this.state.password.errors}
                  ></InputErrors>
                </div>
              </div>
              <input
                type="submit"
                className="btn btn-block signup__button"
                value="Submit"
              ></input>
            </form>
          </div>
        ) : (
          <div className={"signup__success"}>
            <img
              src="https://img.icons8.com/cute-clipart/100/000000/checked.png"
              alt="approved"
            />
            <h1>
              Thanks! your account has been <br /> successfully created.
            </h1>
            <p>Now you can login to the website.</p>
            <Link to={`/`}>
              <button className="btn">&#8592; Back to Home </button>
            </Link>
          </div>
        )}
        <div className="signup__img">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
            <path
              fill="#fc3"
              fillOpacity="1"
              d="M0,0L48,53.3C96,107,192,213,288,218.7C384,224,480,128,576,122.7C672,117,768,203,864,197.3C960,192,1056,96,1152,96C1248,96,1344,192,1392,240L1440,288L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
            ></path>
          </svg>
          <Logo className="signup__img--svg2" />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  approvedSignup: state.user.approvedSignup,
});

export default connect(mapStateToProps, { signUp })(SingUpUser);
