import React from "react";

const SideNav = ({ type, setType }) => {
  return (
    <ul className={"admin__side-navigation--profile-bottons"}>
      <li
        className={`${type === "users" ? "active" : ""}`}
        onClick={() => setType("users")}
      >
        <i className={"fas fa-users"} /> Users
      </li>
      <li
        className={`${type === "items" ? "active" : ""}`}
        onClick={() => setType("items")}
      >
        <i className={"fas fa-database"} /> Products
      </li>
      <li
        className={`${type === "orders" ? "active" : ""}`}
        onClick={() => setType("orders")}
      >
        <i className={"fa fa-ticket"} /> Orders
      </li>
      <li
        className={`${type === "dashboard" ? "active" : ""}`}
        onClick={() => setType("dashboard")}
      >
        <i className={"fas fa-chart-line"} /> Dashboard
      </li>
      <li>
        <i className={"fas fa-user-circle"} /> Account
      </li>
      <li
        className={`${type === "messages" ? "active" : ""}`}
        onClick={() => setType("messages")}
      >
        <i className={"fas fa-inbox"} /> Message
      </li>
    </ul>
  );
};

export default SideNav;
