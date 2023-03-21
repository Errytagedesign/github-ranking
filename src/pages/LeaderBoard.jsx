import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Button } from "react-bootstrap";
import { useStateValue } from "../context/StateContext";

function LeaderBoard({ userData, setUserData }) {
  // console.log(userData);

  const [loading, setLoading] = useState(false);
  const [userFollowers, setUserFollowers] = useState([]);
  const [repoOwners, setRepoOwners] = useState("");
  const [repoNames, setRepoNames] = useState([]);
  const [repoUrls, setRepoUrls] = useState([]);
  // const [followers, setFollowers] = useState([]);

  // get string of our query from address bar after auth
  const queryStrings = window.location.search;
  //   get query from url params
  const urlParams = new URLSearchParams(queryStrings);

  // GET the code sent from github through url params
  const codeParams = urlParams.get("code");

  const clientId = process.env.REACT_APP_CLIENT_ID;
  const clientSecret = process.env.REACT_APP_CLIENT_SECRET;

  // 1. Get accessToken
  const getToken = useCallback(async () => {
    const getTokenParams = new URLSearchParams({
      client_id: clientId,
      client_secret: clientSecret,
      code: codeParams,
      // scope: "repo,gist",
    });

    const url = `https://github.com/login/oauth/access_token?${getTokenParams.toString()}`;

    // This should only run if code params is available
    // Which means, if token acees is true in localstorage, no need to login again.

    if (codeParams) {
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
          // console.log(data.access_token);
          setLoading(false);

          if (data.access_token) {
            localStorage.setItem(
              "accessToken",
              JSON.stringify(data.access_token)
            );

            window.location.reload();
          }
        });
    }
  }, [clientId, clientSecret, codeParams]);

  // 2. Get userData if Token is available
  const getUserData = useCallback(async () => {
    const url = "https://api.github.com/user";
    const userToken = JSON.parse(localStorage.getItem("accessToken"));
    if (userToken) {
      //   use try catch to get errors in case of errors
      try {
        const getUserData = await fetch(url, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${userToken}`,
            Accept: "application/json",
          },
        });

        //   Check if there's error with the response before proceeding
        if (!getUserData.ok) {
          throw new Error(`HTTP error! status ${getUserData.status}`);
        }

        //   If everything good then display user data
        const gitUserData = await getUserData.json();
        setUserData(gitUserData);
      } catch (e) {
        console.log(e);
      }
    }
  }, [setUserData]);

  useEffect(() => {
    setLoading(true);

    getToken();
    getUserData();
  }, [getToken, getUserData]);

  // The value here will be memoized and  will only rerun if userData.followers_url changes, and this can only changes if getUserData function reruns

  const followers = useCallback(async () => {
    await fetch(userData.followers_url)
      .then((responses) => {
        return responses.json();
      })
      .then((datas) => {
        // console.log(datas);

        // Map through the returned data to extract the repoOwners names
        setRepoOwners(datas.map((user) => user.login));
        // setRepoUrls(datas.map((user) => user.repos_url));

        //  Fetch repo_url of each of my followers and extract their repo names by mapping through it
        datas.map(
          async (userRepo) =>
            await fetch(userRepo.repos_url)
              .then((res) => {
                return res.json();
              })
              .then((repoUrls) => {
                setRepoNames(repoUrls.map((repName) => repName.name));
              })
        );
      });
  }, [userData.followers_url]);

  // console.log(repos);
  // console.log(repoOwners);
  // console.log(repoUrls);
  // console.log(repoNames);

  // console.log(userFollowers[0]);

  // let contributions = [];
  const getCommits = useCallback(async () => {
    for (const name of repoOwners) {
      // console.log(name);
      for (const url of repoNames) {
        // console.log(url);
        fetch(`https://api.github.com/repos/${name}/${url}/contributors`)
          .then((res) => {
            return res.json();
          })
          .then((dats) => {
            // everything works fine, but i'm having rate limit problem from github
            console.log(dats);
          });
      }
    }

    // console.log(commits);
  }, [repoNames, repoOwners]);

  // console.log(contributions);

  useEffect(() => {
    followers();
    getCommits();
  }, [followers, getCommits]);

  // console.log(userFollowers);

  return (
    <div className=" d-flex flex-column flex-md-row">
      <main className="d-flex flex-column">
        <div className="col-12">
          <img
            className="col-12"
            src={userData.avatar_url}
            alt="Sodeea Olaide Awoyemi"
          />
        </div>
        <h2> {userData.name} </h2>
        <small> {userData.bio ? userData.bio : ""} </small>
        <small> {userData.email ? userData.email : ""} </small>
        <small>{userData.followers}</small>
        <small>{userData.following}</small>

        <small>{userData.public_repos}</small>
      </main>
      <aside></aside>
    </div>
  );
}

export default LeaderBoard;

//

// return Promise.all(
//   data.map(async (follow) => {
//     return await fetch(follow.repos_url).then((res) => {
//       return res.json();
//     });
//   })
// ).then((repoList) => {
//   // concatenate all nested arrays into a single array using array.flat() method
//   const repoUrl = repoList.flat();

//   // console.log(repoUrl[0].contributors_url);
//   // Now map exactly what i needed which is the controbutors url to a new array
//   const contributorsUrl = repoUrl.map(
//     (commits) => commits.contributors_url
//   );
//   const repoOwner = repoUrl.map((owner) => owner.owner.login);
//   setRepoOwners(repoOwner);
//   // console.log(repoOwner);
//   const repoName = repoUrl.map((name) => name.name);

//   setRepoNames(repoName);
//   // console.log(repoName);
//   setUserFollowers((current) => [...current, contributorsUrl]);
// });
// })

const data = [{ login: "Toks" }, { login: "dot" }, { login: "mak" }];
