import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

import { BrowserRouter as Router } from "react-router-dom";

import { StateProvider } from "./context/StateContext";
import { initialState, reducer } from "./context/Reducer";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <StateProvider initialState={initialState} reducer={reducer}>
      <Router>
        <App />
      </Router>
    </StateProvider>
  </React.StrictMode>
);
