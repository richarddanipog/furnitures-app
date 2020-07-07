import React, { Component } from "react";
import Loader from "../Loading/Loader";
import PriceButton from "./PriceButton";
import ColorButton from "./ColorButton";
import CategoryButton from "./CategoryButton";
import Gallery from "../Gallery/Gallery";
import CartButtonFixed from "../Gallery/CartButtonFixed";
import { connect } from "react-redux";
import {
  fetchItem,
  buildQuery,
  countItem,
  removePropFromQuery,
} from "../../actions/itemActions";

class SearchByCategory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toggleButton: "",
      firstPage: 1,
      secondPage: 2,
    };
  }

  onButton = (type) => {
    if (this.state.toggleButton !== type) {
      this.setState({ toggleButton: type });
    } else {
      this.setState({ toggleButton: "" });
    }
  };

  componentDidMount() {
    window.scrollTo(0, 0);
    this.props.countItem();
    this.props.buildQuery({
      categories: this.props.match.params.categories,
      page: 1,
    });
  }

  componentDidUpdate(prevProps) {
    if (JSON.stringify(prevProps.query) !== JSON.stringify(this.props.query)) {
      this.props.fetchItem(this.props.query);
      if (prevProps.query.categories !== this.props.query.categories) {
        this.setState({ firstPage: 1 });
      }
    }
  }

  onOptionSelect = ({ target: { name, value } }) => {
    this.props.buildQuery({ [name]: value });
  };

  onPaginationNext = () => {
    const { query, countItems } = this.props;
    const { firstPage, secondPage } = this.state;
    if (firstPage * 16 < countItems[query.categories]) {
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }, 500);
      this.setState(
        {
          firstPage: secondPage,
          secondPage: secondPage + 1,
        },
        () => this.props.buildQuery({ page: this.state.firstPage })
      );
    }
  };

  onPaginationPrev = () => {
    const { firstPage } = this.state;
    if (firstPage > 1) {
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }, 500);
      this.setState(
        {
          firstPage: firstPage - 1,
          secondPage: firstPage,
        },
        () => this.props.buildQuery({ page: this.state.firstPage })
      );
    }
  };

  removeFromFilter = (key) => {
    const { query } = this.props;

    this.props.removePropFromQuery(key);
    if (!query.minPrice || !query.maxPrice) {
      const list_checkbox = document.querySelectorAll(".input_check");
      list_checkbox.forEach((checkbox) => (checkbox.checked = false));
    }
  };

  render() {
    const { query, items } = this.props;
    const { toggleButton, firstPage, secondPage } = this.state;

    const filterHeader = (prop, i) => {
      if (query[prop].length && !Array.isArray(query[prop])) {
        return (
          <label key={i}>
            <span
              className={"choosen_filters mr-3"}
              key={i}
              onClick={() => this.removeFromFilter(prop, query[prop])}
            >
              {" "}
              {prop === "minPrice" || prop === "maxPrice"
                ? "Price"
                : prop} : {query[prop].toString()} &#9747;
            </span>
            <span className="mr-3">|</span>
          </label>
        );
      }
    };

    return (
      <div className="container">
        <div
          className={
            "filter-bar row justify-content-between align-items-center pt-3 m-0"
          }
        >
          <div className={"col-sm-12 col-md-10 mt-3"}>
            {Object.keys(query).map((p, i) => filterHeader(p, i))}
          </div>
          <div className="col-sm-12 col-md-2 mt-3">
            <span className="pr-2">Sort By :</span>
            <select
              id={"options"}
              name={"sortBy"}
              onChange={this.onOptionSelect}
            >
              <option value={""}>Best Selling</option>
              <option value={"low-high"}>Price Low - High</option>
              <option value={"high-low"}>Price High - Low</option>
              <option value={"new"}>New Arrival</option>
            </select>
          </div>
        </div>

        <div className={"product-search row m-0"}>
          <form className="product-search__filters col-12 col-lg-2 ">
            <div className="product-search__filters-buttons ">
              <PriceButton
                onButton={this.onButton}
                toggleButton={toggleButton}
              />
              <hr />
              <ColorButton
                onButton={this.onButton}
                toggleButton={toggleButton}
              />
              <hr />
              <CategoryButton
                onButton={this.onButton}
                toggleButton={toggleButton}
              />
            </div>
          </form>
          {items.length > 0 ? (
            <div className="product-search__products col-12 col-lg-10">
              <Gallery items={items} />
              <ul className="pagination d-flex justify-content-center mb-5">
                <li className="pagination__page-item">
                  <span className="page-link" onClick={this.onPaginationPrev}>
                    Prev
                  </span>
                </li>
                <li className="pagination__page-item">
                  <span className="page-link">{firstPage}</span>
                </li>
                <li className="pagination__page-item">
                  <span className="page-link">{secondPage}</span>
                </li>
                <li className="pagination__page-item">
                  <span className="page-link" onClick={this.onPaginationNext}>
                    Next
                  </span>
                </li>
              </ul>
            </div>
          ) : (
            <div className={"loader-wrapper col-10"}>
              <Loader items={items} />
            </div>
          )}
        </div>
        <CartButtonFixed />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  items: state.items.items,
  query: state.items.query,
  countItems: state.items.countItems,
});

export default connect(mapStateToProps, {
  fetchItem,
  buildQuery,
  countItem,
  removePropFromQuery,
})(SearchByCategory);
