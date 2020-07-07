import React, { Component } from "react";
import { getItemReviews, addItemReviews } from "../../actions/itemActions";
import { setModalShow } from "../../actions/userAction";
import { connect } from "react-redux";

class ItemReviews extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      comment: "",
      rating: 0,
      hoverStar: 0,
      loading: false,
    };
  }
  componentDidMount() {
    this.props.getItemReviews(this.props.item_id);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.itemReviews.length !== this.props.itemReviews.length) {
      this.props.getItemReviews(this.props.item_id);
    }
  }

  onInputChange = ({ target: { name, value } }) => {
    this.setState({
      [name]: value,
    });
  };

  onSubmit = (e) => {
    const { user, addItemReviews, item_id } = this.props;
    e.preventDefault();
    const newReview = {
      ...this.state,
      user_first_name: user.first_name,
      user_last_name: user.last_name,
      item_id,
    };

    // when add review is true close collapse
    document.querySelector(".card-header").classList.add("collapsed");
    this.setState({ loading: !this.state.loading });
    setTimeout(() => {
      document.querySelector("#collapseOne").classList.remove("show");
      this.setState({ loading: !this.state.loading });
      addItemReviews(newReview);
    }, 2000);
  };

  onStarRating = ({ target: { value } }) => {
    this.setState({ rating: value });
  };

  onHoverStar = (value) => {
    this.setState({ hoverStar: value });
  };

  render() {
    const { itemReviews, user, setModalShow } = this.props;
    const { rating, hoverStar, loading } = this.state;

    const buildReviewList = (singleReview) => {
      return (
        <div className="row" key={singleReview.id}>
          <div className={"itemReviews__comment--left col-12 col-md-2"}>
            {[...Array(5)].map((star, i) => {
              const ratingVal = i + 1;
              return (
                <i
                  key={i}
                  className={"fa fa-star"}
                  style={{
                    color: `${
                      ratingVal <= singleReview.rating ? "#ffc107" : "#e4e5e9"
                    }`,
                  }}
                />
              );
            })}
            <strong>
              {singleReview.user_first_name} {singleReview.user_last_name[0]}.
            </strong>
            <label>{singleReview.comment_date.slice(0, 10)}</label>
          </div>
          <div className="itemReviews__comment--right col-12 col-md-9">
            <strong>{singleReview.title}</strong>
            <p>{singleReview.comment}</p>
          </div>
        </div>
      );
    };

    return (
      <div className="itemReviews">
        <h5 className={"mb-3"}>Product Reviews</h5>
        <div className="itemReviews__container">
          <div className={"itemReviews__comment container"}>
            {itemReviews.map((singleReview) => buildReviewList(singleReview))}
          </div>

          <div className="accordion mt-5" id="accordionExample">
            <div className="card">
              <label
                className="accordion__btn card-header"
                id="headingOne"
                type="button"
                data-toggle="collapse"
                data-target="#collapseOne"
                aria-expanded="true"
                aria-controls="collapseOne"
              >
                Add Review
              </label>

              {loading && (
                <div className="LoaderWrapper">
                  <div className="LoaderWrapper__loader"></div>
                </div>
              )}

              <div
                id="collapseOne"
                className="collapse"
                aria-labelledby="headingOne"
                data-parent="#accordionExample"
              >
                <div className={"itemReviews__addComment card-body"}>
                  <form
                    onSubmit={(e) => (user ? this.onSubmit : setModalShow(e))}
                  >
                    <input
                      className={"d-block"}
                      type="text"
                      name="title"
                      placeholder={"Title"}
                      onChange={this.onInputChange}
                    />
                    <textarea
                      name="comment"
                      id="comment"
                      rows="3"
                      placeholder={"Comment..."}
                      onChange={this.onInputChange}
                    ></textarea>
                    <div>
                      Rating:{" "}
                      {[...Array(5)].map((star, i) => {
                        const ratingVal = i + 1;
                        return (
                          <label
                            key={i}
                            className={"itemReviews__addComment-rating"}
                          >
                            <input
                              type="radio"
                              name="rating"
                              value={ratingVal}
                              onClick={this.onStarRating}
                            />
                            <i
                              className={"fa fa-star"}
                              style={{
                                color: `${
                                  ratingVal <= (hoverStar || rating)
                                    ? "#ffc107"
                                    : "#e4e5e9"
                                }`,
                              }}
                              onMouseEnter={() => this.onHoverStar(ratingVal)}
                              onMouseLeave={() => this.onHoverStar(0)}
                            />
                          </label>
                        );
                      })}
                    </div>
                    <input
                      className={"d-block"}
                      type="submit"
                      value="Comment"
                    />
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  itemReviews: state.items.itemReviews,
  user: state.user.user,
});

export default connect(mapStateToProps, {
  getItemReviews,
  addItemReviews,
  setModalShow,
})(ItemReviews);
