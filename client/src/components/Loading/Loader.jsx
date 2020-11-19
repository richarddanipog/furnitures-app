import React, { Component } from "react";
// import { ReactComponent as NotFound } from "../../svg-icons/notFound.svg";

class Loader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notFound: false,
    };
  }

  componentDidMount() {
    this.timeOut = setTimeout(
      () => this.setState({ notFound: !this.state.notFound }),
      4000
    );
  }
  componentWillUnmount() {
    clearInterval(this.timeOut);
  }

  render() {
    return (
      <div className={"mt-5"}>
        {this.state.notFound ? (
          <div className={"loader-wrapper__notfound"}>
            <h1 className={"text-center"}>
              Sorry, not found try something else
            </h1>
            {/* <NotFound /> */}
          </div>
        ) : (
          <div className="loading">
            <div className="ob"></div>
            <div className="ob"></div>
            <div className="ob"></div>
            <div className="ob"></div>
            <div className="ob"></div>
            <div className="ob"></div>
            <div className="ob"></div>
            <div className="ob"></div>
            <div className="ob"></div>
            <div className="ob"></div>
          </div>
        )}
      </div>
    );
  }
}

export default Loader;
