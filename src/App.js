import React, { useState } from "react";

import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LeaderBoard from "./pages/LeaderBoard";
import Signin from "./pages/SignIn";
import UserProfile from "./pages/UserProfile";
// import ProtectedRoutes from "./components/ProtectedRoutes";
// import { useStateValue } from "./context/StateContext";

function App() {
  const [userData, setUserData] = useState([]);
  // const [{ user }] = useStateValue();

  // console.log(user);
  // const AOS = require("aos");
  // useEffect(() => {
  //   AOS.init();
  // }, [AOS]);

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route
            path="/signin"
            element={<Signin userData={userData} setUserData={setUserData} />}
          />

          <Route
            path="/"
            element={
              <LeaderBoard userData={userData} setUserData={setUserData} />
            }
          />
          <Route path="/user" element={<UserProfile />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
