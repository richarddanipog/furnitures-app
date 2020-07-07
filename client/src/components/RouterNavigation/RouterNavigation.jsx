import React from "react";
import HomePage from "../HomePage/HomePage";
import Header from "../Header-Footer/Header";
import Footer from "../Header-Footer/Footer";
import SignUpUser from "../Header-Footer/SingUpUser";
import AdminControlPanel from "../Admin/AdminControlPanel";
import AddItem from "../Admin/AddItem";
import EditItem from "../Admin/EditItem";
import SingleItem from "../SingleItem/SingleItem";
import Categories from "../Gallery/Categories";
import UserProfile from "../User-Proflie/UserProfile";
import SearchByCategory from "../Gallery/SearchByCategory";
import Checkout from "../User-Proflie/Checkout";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { connect } from "react-redux";

const RouterNavigation = ({ toAdminPanel }) => {
  return (
    <>
      {!toAdminPanel ? (
        <Router>
          <div className={`App container`}>
            <Header />

            <Switch>
              <Route path="/signup">
                <SignUpUser />
              </Route>

              <Route
                path="/categories/search-by-category/:categories"
                component={SearchByCategory}
              />

              <Route path="/user-account/checkout">
                <Checkout />
              </Route>

              <Route path="/user-account">
                <UserProfile />
              </Route>

              <Route path="/categories">
                <Categories />
              </Route>

              <Route path="/item/:id" component={SingleItem} />

              <Route path="/">
                <HomePage />
              </Route>
            </Switch>

            <Footer />
          </div>
        </Router>
      ) : (
        <Router>
          <Switch>
            <Route exact path="/" component={AdminControlPanel} />
            <Route path="/add-item">
              <AddItem />
            </Route>
            <Route path="/update-item/:id" component={EditItem} />
          </Switch>
        </Router>
      )}
    </>
  );
};

const mapStateToProps = (state) => ({
  user: state.user.user,
  toAdminPanel: state.admin.toAdminPanel,
});

export default connect(mapStateToProps, null)(RouterNavigation);
