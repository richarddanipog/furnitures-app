import React from "react";

const AdminCounterCards = ({ itemsCount, usersCount }) => {
  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-3">
          <div className="card-counter primary">
            <i className="fa fa-dollar-sign" />
            <span className="card-counter__numbers">12,567</span>
            <span className="card-counter__name">Total Income</span>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card-counter danger">
            <i className="fa fa-ticket"></i>
            <span className="card-counter__numbers">599</span>
            <span className="card-counter__name">Orders</span>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card-counter success">
            <i className="fa fa-database"></i>
            <span className="card-counter__numbers">{itemsCount}</span>
            <span className="card-counter__name">Products</span>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card-counter info">
            <i className="fa fa-users"></i>
            <span className="card-counter__numbers">{usersCount}</span>
            <span className="card-counter__name">Users</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminCounterCards;
