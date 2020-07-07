import React, { useState } from "react";
import { userUpdateProfile } from "../../actions/userAction";
import { connect } from "react-redux";

const Account = (props) => {
  const [editField, setEditField] = useState(0);

  const onEdit = (editNumber) => {
    setEditField(editNumber);
  };

  const onSave = (data, editNumber) => {
    setEditField(editNumber);
    props.userUpdateProfile(data);
  };

  const { user, first_name, last_name, phone, email } = props;
  return (
    <div className={"account-zone__profile p-5"}>
      <h1>Profile & Password</h1>
      <div className={"container"}>
        <div className={"row"}>
          <div className={"col-sm-12 col-md-6"}>
            <h5>Your personal information</h5>
            <hr />
            <div className={"account-zone__profile-field"}>
              <label>First Name:</label>
              {editField !== 1 ? (
                <div className={"d-flex justify-content-between"}>
                  <p>{user.first_name}</p>
                  <span onClick={() => onEdit(1)}>
                    Edit <i className={"fa fa-edit"}></i>
                  </span>
                </div>
              ) : (
                <div className={"account-zone__profile-change"}>
                  <input
                    type="text"
                    name={"first_name"}
                    value={first_name}
                    placeholder={"First name"}
                    onChange={props.inputChange}
                  />
                  <div className={"text-right"}>
                    <button
                      className={"btn btn-secondary mr-2"}
                      onClick={() => onEdit(0)}
                    >
                      Cancel
                    </button>
                    <button
                      className={"btn btn-primary mr-2"}
                      onClick={() => onSave({ first_name }, 0)}
                    >
                      Save
                    </button>
                  </div>
                </div>
              )}
            </div>
            <div className={"account-zone__profile-field"}>
              <label>Last Name:</label>
              {editField !== 2 ? (
                <div className={"d-flex justify-content-between"}>
                  <p> {user.last_name}</p>
                  <span onClick={() => onEdit(2)}>
                    Edit <i className={"fa fa-edit"}></i>
                  </span>
                </div>
              ) : (
                <div className={"account-zone__profile-change"}>
                  <input
                    type="text"
                    name={"last_name"}
                    value={last_name}
                    placeholder={"Last name"}
                    onChange={props.inputChange}
                  />
                  <div className={"text-right"}>
                    <button
                      className={"btn btn-secondary mr-2"}
                      onClick={() => onEdit(0)}
                    >
                      Cancel
                    </button>
                    <button
                      className={"btn btn-primary mr-2"}
                      onClick={() => onSave({ last_name }, 0)}
                    >
                      Save
                    </button>
                  </div>
                </div>
              )}
            </div>
            <div className={"account-zone__profile-field"}>
              <label>Email address:</label>
              {editField !== 3 ? (
                <div className={"d-flex justify-content-between"}>
                  <p>{user.email}</p>
                  <span onClick={() => onEdit(3)}>
                    Edit <i className={"fa fa-edit"}></i>
                  </span>
                </div>
              ) : (
                <div className={"account-zone__profile-change"}>
                  <input
                    type="email"
                    name={"email"}
                    value={email}
                    placeholder={"Email"}
                    onChange={props.inputChange}
                  />
                  <div className={"text-right"}>
                    <button
                      className={"btn btn-secondary mr-2"}
                      onClick={() => onEdit(0)}
                    >
                      Cancel
                    </button>
                    <button
                      className={"btn btn-primary mr-2"}
                      onClick={() => onSave({ email }, 0)}
                    >
                      Save
                    </button>
                  </div>
                </div>
              )}
            </div>
            <div className={"account-zone__profile-field"}>
              <label>Phone number:</label>
              {editField !== 4 ? (
                <div className={"d-flex justify-content-between"}>
                  <p>{user.phone}</p>
                  <span onClick={() => onEdit(4)}>
                    Edit <i className={"fa fa-edit"}></i>
                  </span>
                </div>
              ) : (
                <div className={"account-zone__profile-change"}>
                  <input
                    type="text"
                    name={"phone"}
                    value={phone}
                    placeholder={"Phone Number"}
                    onChange={props.inputChange}
                  />
                  <div className={"text-right"}>
                    <button
                      className={"btn btn-secondary mr-2"}
                      onClick={() => onEdit(0)}
                    >
                      Cancel
                    </button>
                    <button
                      className={"btn btn-primary mr-2"}
                      onClick={() => onSave({ phone }, 0)}
                    >
                      Save
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className={"col-sm-12 col-md-6"}>
            <h5>Your password</h5>
            <hr />
            <div className={"account-zone__profile-field"}>
              <label>Password:</label>
              {editField !== 5 ? (
                <div className={"d-flex justify-content-between"}>
                  <p>*********</p>
                  <span onClick={() => onEdit(5)}>
                    Edit <i className={"fa fa-edit"}></i>
                  </span>
                </div>
              ) : (
                <div className={"account-zone__profile-change"}>
                  <input
                    type="password"
                    name={"password"}
                    value={props.password}
                    placeholder={"Password"}
                    onChange={props.inputChange}
                  />
                  <div className={"text-right"}>
                    <button
                      className={"btn btn-secondary mr-2"}
                      onClick={() => onEdit(0)}
                    >
                      Cancel
                    </button>
                    <button className={"btn btn-primary mr-2"}>Save</button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  first_name: state.user.first_name,
  last_name: state.user.last_name,
  email: state.user.email,
  phone: state.user.phone,
  address: state.user.address,
  password: state.user.password,
});

const mapDispatchToProps = (dispatch) => {
  return {
    inputChange: ({ target: { name, value } }) => {
      dispatch({ type: "HANDLE_CHANGE", payload: { name, value } });
    },
    userUpdateProfile: (data, token) => {
      dispatch(userUpdateProfile(data, token));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Account);
