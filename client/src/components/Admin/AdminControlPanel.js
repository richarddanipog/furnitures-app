import React, { useEffect, useState } from "react";
import AdminCounterCards from "./CounterCards";
import { connect } from "react-redux";
import {
  fetchAllUsers,
  fetchAllItems,
  toAdminPanel,
} from "../../actions/adminActions";
import UsersTable from "./UsersTable";
import ItemsTable from "./ItemsTable";
import Messages from "./Messages";
import DashBoard from "./Dashboard";
import SideNav from "./SideNav";

const AdminControlPanel = ({
  fetchAllUsers,
  fetchAllItems,
  match,
  allUsers,
  user,
  allItems,
  toAdminPanel,
}) => {
  const [type, setType] = useState("users");

  useEffect(() => {
    fetchAllUsers();
    fetchAllItems();
  }, [fetchAllUsers, fetchAllItems, match]);

  return (
    <div className={"admin container-fluid"}>
      <header className="admin__header d-flex justify-content-between">
        <div>
          <button className="admin__header-btn" onClick={toAdminPanel}>
            Go Homepage
          </button>
        </div>
        <div className="text-right">
          {user && <strong className="mr-5">{user.first_name}</strong>}
          <img src="../../images/admin.png" width={"10%"} alt="avatar" />
        </div>
      </header>
      <div className={"row pt-2"}>
        <div className={"admin__side-navigation col-12 col-lg-2"}>
          <div className={"admin__side-navigation--profile"}>
            <div className={"d-flex justify-content-around align-items-center"}>
              <img
                className={"logo-img"}
                src={"../../mainLogo.png"}
                alt={"avatar admin"}
              />
              <strong style={{ textTransform: "uppercase" }}>furnitures</strong>
            </div>
            <SideNav setType={setType} type={type} />
          </div>
        </div>

        <div className={"admin__content col-12 col-lg-10"}>
          <AdminCounterCards
            usersCount={allUsers.length}
            itemsCount={allItems.length}
          />

          {type === "dashboard" && <DashBoard usersCount={allUsers.length} />}

          {type === "users" && <UsersTable users={allUsers} />}

          {type === "items" && <ItemsTable items={allItems} />}
          {type === "messages" && <Messages />}

          {type === "orders" && <h1>Orders</h1>}
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  allUsers: state.admin.allUsers,
  allItems: state.admin.allItems,
  user: state.user.user,
});

export default connect(mapStateToProps, {
  fetchAllUsers,
  fetchAllItems,
  toAdminPanel,
})(AdminControlPanel);
