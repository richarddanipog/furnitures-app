import React from "react";
import { Provider } from "react-redux";
import store from "./store";
import "./css/main.css";
import RouterNavigation from "./components/RouterNavigation/RouterNavigation";

const App = () => {
  return (
    <Provider store={store}>
      <RouterNavigation />
    </Provider>
  );
};

export default App;
