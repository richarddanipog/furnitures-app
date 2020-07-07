import React, { Component } from "react";
import validate, { field } from "../Validations/validator";
import InputErrors from "../Validations/inputErrors";
import { connect } from "react-redux";
import { adminAddItem } from "../../actions/adminActions";
import ModalBootstrap from "react-bootstrap/Modal";
import { Link } from "react-router-dom";

class AddItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: field({ name: "name", isRequired: true, minLength: 10 }),
      categories: field({ name: "categories", isRequired: true }),
      price: field({ name: "price", isRequired: true }),
      color: field({ name: "color", isRequired: true, minLength: 3 }),
      description: field({
        name: "description",
        isRequired: true,
        minLength: 30,
      }),
      images: field({
        name: "images",
        isRequired: true,
        minLength: 1,
        maxLength: 4,
      }),
      quantity: field({ name: "quantity", isRequired: true }),
      showModal: false,
    };
  }

  onInputChange = ({ target: { name, value, files } }) => {
    if (name !== "images") {
      const errors = validate(name, value, this.state[name].validations);
      this.setState({
        [name]: {
          ...this.state[name],
          value,
          errors,
        },
      });
    } else {
      const errors = validate(name, files, this.state[name].validations);
      this.setState(
        {
          [name]: {
            ...this.state[name],
            value: [...files, ...this.state[name].value],
            errors,
          },
        },
        // callback for display image on
        () => {
          const d = document.getElementsByClassName(
            "addItem__form-cell--images"
          )[0];
          d.innerHTML = "";
          for (let i = 0; i < this.state[name].value.length; i++) {
            const att = document.createAttribute("id");
            att.value = `show-img-${i}`;
            let createdImg = document.createElement("img");
            createdImg.setAttributeNode(att);
            d.appendChild(createdImg);
            document.getElementById(
              `show-img-${i}`
            ).src = window.URL.createObjectURL(this.state[name].value[i]);
          }
        }
      );
    }
  };

  onFormSubmit = (e) => {
    e.preventDefault();
    let isOK = true;

    for (let prop in this.state) {
      const field = this.state[prop];
      if (field instanceof Object) {
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
    }

    if (isOK) {
      const result = {};
      const form_data = new FormData();
      for (let prop in this.state) {
        result[prop] = this.state[prop].value;
        form_data.append(prop, this.state[prop].value);
      }

      for (let i = 0; i < document.querySelector("#img").files.length; i++) {
        form_data.append("images", document.querySelector("#img").files[i]);
      }

      this.props.adminAddItem(form_data);
      this.setState({
        showModal: !this.state.showModal,
      });
    }
  };

  render() {
    const { showModal } = this.state;
    const { newItemId } = this.props;

    return (
      <div className={"addItem container"}>
        <Link to={"/"} style={{ color: "black" }}>
          <label>
            <i className={"fa fa-arrow-circle-left"} />
          </label>
        </Link>
        <h1 className={"text-center"}>Add Item</h1>
        <p className={"text-center"}>Let's create your item tamplate</p>
        <div>
          <form className={"addItem__form"} onSubmit={this.onFormSubmit}>
            <div className={"addItem__form-cell row"}>
              <div className={"col-6 col-lg-3"}>
                <label>Item Name: </label>
                <input
                  type="text"
                  placeholder={"Name"}
                  name={"name"}
                  onBlur={this.onInputChange}
                />
                <InputErrors errors={this.state.name.errors} />
              </div>
              <div className={"col-6 col-lg-3"}>
                <label>Price: </label>
                <input
                  type="number"
                  placeholder={"Price"}
                  name={"price"}
                  onChange={this.onInputChange}
                />
                <InputErrors errors={this.state.price.errors} />
              </div>
              <div className={"col-6 col-lg-3"}>
                <label>Color: </label>
                <input
                  type="text"
                  placeholder={"Color"}
                  name={"color"}
                  onChange={this.onInputChange}
                />
                <InputErrors errors={this.state.color.errors} />
              </div>

              <div className={"col-6 col-lg-3"}>
                <label>Category: </label>
                <select
                  name={"categories"}
                  id="categories"
                  onChange={this.onInputChange}
                >
                  <option value="0">Category</option>
                  <option value="indoor">Indoor</option>
                  <option value="outdoor">Outdoor</option>
                  <option value="decor">Decor</option>
                  <option value="kitchen">Kitchen</option>
                </select>
                <InputErrors errors={this.state.categories.errors} />
              </div>
            </div>
            <hr />
            <div className={"addItem__form-cell row"}>
              <div className="col-12 col-lg-6">
                <label>Description: </label>
                <textarea
                  type="text"
                  placeholder={"Description"}
                  name={"description"}
                  onChange={this.onInputChange}
                ></textarea>
                <InputErrors errors={this.state.description.errors} />
              </div>
              <div className={"col-6 col-lg-3"}>
                <label>Quantity: </label>
                <select
                  name={"quantity"}
                  id="quantity"
                  onChange={this.onInputChange}
                >
                  <option value="0">Quantity</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                  <option value="6">6</option>
                  <option value="7">7</option>
                  <option value="8">8</option>
                  <option value="9">9</option>
                  <option value="10">10</option>
                </select>
                <InputErrors errors={this.state.quantity.errors} />
              </div>
            </div>
            <hr />
            <div className={"addItem__form-cell row"}>
              <div className={"col-12 col-lg-9"}>
                <label>Images: </label>
                <input
                  type={"file"}
                  id={"img"}
                  name={"images"}
                  accept={"image/*"}
                  onChange={this.onInputChange}
                  multiple
                />
                <InputErrors errors={this.state.images.errors} />
                <div className={"addItem__form-cell--images"}>
                  <img className={"images"} id={"show-img-0"} alt={""} />
                  <img className={"images"} id={"show-img-1"} alt={""} />
                  <img className={"images"} id={"show-img-2"} alt={""} />
                  <img className={"images"} id={"show-img-3"} alt={""} />
                  <img className={"images"} id={"show-img-4"} alt={""} />
                </div>
              </div>
            </div>

            <input type="submit" value={"ADD ITEM"} className={"submit"} />
          </form>

          <ModalBootstrap
            size="md"
            show={showModal}
            onHide={() => this.setState({ showModal: !showModal })}
            aria-labelledby="example-modal-sizes-title-sm"
            centered
          >
            <ModalBootstrap.Body>
              <div id={"modal"}>
                <img src="../../images/success.png" alt="" width={"30%"} />
                <div className={"text-center"}>
                  <h1>Success</h1>
                  <p>Your item was added to your collections</p>
                </div>
                <div className="d-flex justify-content-between">
                  <a href={"/admin/add-item"}>Add More? &#8634;</a>
                  <Link to={`/item/${newItemId}`}>See Item &#8594;</Link>
                </div>
              </div>
            </ModalBootstrap.Body>
          </ModalBootstrap>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  newItemId: state.items.newItemId,
});

export default connect(mapStateToProps, { adminAddItem })(AddItem);
