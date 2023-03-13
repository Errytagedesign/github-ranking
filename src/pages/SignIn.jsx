import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { useStateValue } from "../context/StateContext";

function Signin() {
  const [{ user, clientId, clientSecret }, dispatch] = useStateValue();

  //   const [userData, setUserData] = useState("");

  const getUserData = async () => {
    const url = "https://api.github.com/user";
    const userToken = localStorage.getItem("accessToken");

    //   use try catch to get errors in case of errors
    try {
      const gitRes = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${userToken}`,
          Accept: "application/json",
        },
      });

      //   Check if there's error with the response before proceeding
      if (!gitRes.ok) {
        throw new Error(`HTTP error! status ${gitRes.status}`);
      }

      //   If everything good then display user data
      const userData = await gitRes.json();
      console.log(userData);
    } catch (e) {}
  };

  useEffect(() => {
    // get string of our query from address bar after auth
    const queryStrings = window.location.search;
    //   get query from url params
    const urlParams = new URLSearchParams(queryStrings);

    // GET the code sent from github through url params
    const codeParams = urlParams.get("code");
    console.log(codeParams);

    const getToken = async () => {
      const getTokenParams = new URLSearchParams({
        client_id: clientId,
        client_secret: clientSecret,
        code: codeParams,
        scope: "repo,gist",
      });

      const url = `https://github.com/login/oauth/access_token?${getTokenParams.toString()}`;
      await fetch(
        url,

        {
          method: "POST",
          headers: {
            Accept: "application/json",
          },
        }
      )
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          console.log(data.access_token);

          if (data.access_token) {
            localStorage.setItem("accessToken", data.access_token);
          }
        });
    };

    getToken();

    getUserData();
  }, []);

  const handleLoginWithGithub = () => {
    window.location.assign(
      "https://github.com/login/oauth/authorize?client_id=" + clientId
    );
  };

  return (
    <div>
      <Button onClick={handleLoginWithGithub} className="btn btn-success mt-5">
        Sign In
      </Button>
    </div>
  );
}

export default Signin;
