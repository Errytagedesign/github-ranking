import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
// import { useStateValue } from "../context/StateContext";

function Signin({ setUserData }) {
  //   const [{ user, clientId, clientSecret }, dispatch] = useStateValue();

  //   console.log(user);

  //   const [userData, setUserData] = useState("");

  //   useEffect(() => {
  //     // get string of our query from address bar after auth
  //     const queryStrings = window.location.search;
  //     //   get query from url params
  //     const urlParams = new URLSearchParams(queryStrings);

  //     // GET the code sent from github through url params
  //     const codeParams = urlParams.get("code");

  //     setLoading(true);
  //     const getToken = async () => {
  //       const getTokenParams = new URLSearchParams({
  //         client_id: clientId,
  //         client_secret: clientSecret,
  //         code: codeParams,
  //         // scope: "repo,gist",
  //       });

  //       const url = `https://github.com/login/oauth/access_token?${getTokenParams.toString()}`;
  //       await fetch(
  //         url,

  //         {
  //           method: "POST",
  //           headers: {
  //             Accept: "application/json",
  //           },
  //         }
  //       )
  //         .then((res) => {
  //           return res.json();
  //         })
  //         .then((data) => {
  //           //   console.log(data.access_token);
  //           setLoading(false);

  //           if (data.access_token) {
  //             localStorage.setItem("accessToken", data.access_token);

  //             // window.location.replace("/");
  //           }
  //         });
  //     };
  //     getToken();
  //   }, [clientId, clientSecret, dispatch]);

  //   useEffect(() => {
  //     codeParams && setUserData(codeParams);
  //   }, [codeParams, setUserData]);
  const clientId = process.env.REACT_APP_CLIENT_ID;

  const handleLoginWithGithub = () => {
    window.location.assign(
      "https://github.com/login/oauth/authorize?client_id=" + clientId
    );
  };

  return (
    <div className="d-flex flex-column col-8 mx-auto">
      <Button onClick={handleLoginWithGithub} className="btn btn-success mt-5">
        Sign In
      </Button>
    </div>
  );
}

export default Signin;
