import React from "react";

import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import { Routes, Route } from "react-router-dom";
import LeaderBoard from "./pages/LeaderBoard";
import Signin from "./pages/SignIn";
import ProtectedRoutes from "./components/ProtectedRoutes";

function App() {
  // const AOS = require("aos");
  // useEffect(() => {
  //   AOS.init();
  // }, [AOS]);

  return (
    <div className="App">
      <Routes>
        <Route path="/signin" element={<Signin />} />
        <Route element={<ProtectedRoutes />}>
          <Route path="/" element={<LeaderBoard />} />
          <Route path="/user" element={<Signin />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
