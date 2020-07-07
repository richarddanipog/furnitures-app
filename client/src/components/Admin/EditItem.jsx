import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchSingleItem } from "../../actions/itemActions";
import { adminUpdateItem } from "../../actions/adminActions";
import validate, { field } from "../Validations/validator";
import InputErrors from "../Validations/inputErrors";

import { Link } from "react-router-dom";

class EditItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editItem: {},
      activeInput: "",
    };
  }

  componentDidMount() {
    window.scrollTo(0, 0);
    this.props.fetchSingleItem(this.props.match.params.id);
  }

  inputChange = ({ target: { name, value } }) => {
    const errors = validate(name, value, this.state.editItem.validations);
    this.setState({
      editItem: {
        ...this.state.editItem,
        value,
        errors,
      },
    });
  };

  onEditButton = (key, value, { minLength, include }) => {
    this.setState({
      editItem: field({
        name: key,
        value: key === "price" ? parseInt(value) : value,
        isRequired: true,
        minLength,
        include,
      }),
      activeInput: key,
    });
  };

  onSave = () => {
    let isOK = true;
    const field = this.state.editItem;
    const errors = validate(field.name, field.value, field.validations);
    if (errors.length) {
      isOK = false;
      this.setState({
        editItem: {
          ...this.state.editItem,
          errors,
        },
      });
    }
    if (isOK) {
      const result = {};
      result[this.state.editItem.name] = this.state.editItem.value;

      //Send the data somewhere
      this.setState(
        {
          activeInput: "",
        },
        () => this.props.adminUpdateItem(this.props.item.id, result)
      );
    }
  };

  render() {
    const { item } = this.props;
    const { editItem, activeInput } = this.state;

    const showImages = (img, i) => {
      return (
        <img
          className={"mr-4"}
          src={`http://localhost:6500/${img}`}
          alt={"item"}
          key={i}
          width={"15%"}
          style={{ border: "1px solid lightgrey" }}
        />
      );
    };
    return (
      <div className={"edit"}>
        <div className={"edit__go-back"}>
          <Link to={"/"} style={{ color: "black" }}>
            <label>
              <i className={"fa fa-arrow-circle-left"} />
            </label>
          </Link>
          <div className="text-center">
            <h2>Edit Your Item</h2>
          </div>
        </div>
        <div className={"edit-item"}>
          <div className={"edit-item__wrapper"}>
            <p className={"edit-item__header"}>Product No.{item.id}</p>
            {Object.keys(item).length > 0 && (
              <ul className={"edit-item__form"}>
                <li>
                  <label>Name :</label>
                  {activeInput !== "name" ? (
                    <span>{item.name}</span>
                  ) : (
                    <>
                      <input
                        type="text"
                        name={"name"}
                        value={editItem.value}
                        onChange={this.inputChange}
                      />
                      <InputErrors errors={editItem.errors}></InputErrors>
                    </>
                  )}
                  {activeInput !== "name" ? (
                    <span
                      className="change"
                      onClick={() =>
                        this.onEditButton("name", item.name, { minLength: 20 })
                      }
                    >
                      <i className={"fa fa-pencil-alt"} />
                    </span>
                  ) : (
                    <span className="change" onClick={this.onSave}>
                      <i className={"fa fa-check"} />
                    </span>
                  )}
                </li>
                <li>
                  <label>Category : ( indoor, outdoor, decor )</label>
                  {activeInput !== "categories" ? (
                    <span>{item.categories}</span>
                  ) : (
                    <>
                      <input
                        type="text"
                        name={"categories"}
                        value={editItem.value}
                        onChange={this.inputChange}
                      />
                      <InputErrors errors={editItem.errors}></InputErrors>
                    </>
                  )}
                  {activeInput !== "categories" ? (
                    <span
                      className="change"
                      onClick={() =>
                        this.onEditButton("categories", item.categories, {
                          include: ["indoor", "outdoor", "decor"],
                        })
                      }
                    >
                      <i className={"fa fa-pencil-alt"} />
                    </span>
                  ) : (
                    <span className="change" onClick={this.onSave}>
                      <i className={"fa fa-check"} />
                    </span>
                  )}
                </li>
                <li>
                  <label>Price :</label>
                  {activeInput !== "price" ? (
                    <span>$ {item.price}</span>
                  ) : (
                    <>
                      <input
                        type="number"
                        name={"price"}
                        value={editItem.value}
                        onChange={this.inputChange}
                      />
                      <InputErrors errors={editItem.errors}></InputErrors>
                    </>
                  )}
                  {activeInput !== "price" ? (
                    <span
                      className="change"
                      onClick={() =>
                        this.onEditButton("price", item.price, { minLength: 1 })
                      }
                    >
                      <i className={"fa fa-pencil-alt"} />
                    </span>
                  ) : (
                    <span className="change" onClick={this.onSave}>
                      <i className={"fa fa-check"} />
                    </span>
                  )}
                </li>
                <li>
                  <label>Color :</label>
                  {activeInput !== "color" ? (
                    <span>{item.color}</span>
                  ) : (
                    <>
                      <input
                        type="text"
                        name={"color"}
                        value={editItem.value}
                        onChange={this.inputChange}
                      />
                      <InputErrors errors={editItem.errors}></InputErrors>
                    </>
                  )}
                  {activeInput !== "color" ? (
                    <span
                      className="change"
                      onClick={() =>
                        this.onEditButton("color", item.color, {
                          minLength: 20,
                        })
                      }
                    >
                      <i className={"fa fa-pencil-alt"} />
                    </span>
                  ) : (
                    <span className="change" onClick={this.onSave}>
                      <i className={"fa fa-check"} />
                    </span>
                  )}
                </li>
                <li>
                  <label>Description :</label>
                  {activeInput !== "description" ? (
                    <span>{item.description}</span>
                  ) : (
                    <>
                      <textarea
                        type="text"
                        name={"description"}
                        value={editItem.value}
                        onChange={this.inputChange}
                      ></textarea>
                      <InputErrors errors={editItem.errors}></InputErrors>
                    </>
                  )}
                  {activeInput !== "description" ? (
                    <span
                      className="change"
                      onClick={() =>
                        this.onEditButton("description", item.description, {
                          minLength: 20,
                        })
                      }
                    >
                      <i className={"fa fa-pencil-alt"} />
                    </span>
                  ) : (
                    <span className="change" onClick={this.onSave}>
                      <i className={"fa fa-check"} />
                    </span>
                  )}
                </li>
                <li>
                  <label>Images :</label>
                  <span>
                    {item.images
                      .split(",")
                      .map((img, key) => showImages(img, key))}
                  </span>
                  <span className="change">
                    <i className={"fa fa-pencil-alt"} />
                  </span>
                </li>
              </ul>
            )}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  item: state.items.item,
});

export default connect(mapStateToProps, { fetchSingleItem, adminUpdateItem })(
  EditItem
);
