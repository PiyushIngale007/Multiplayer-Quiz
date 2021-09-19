import React, { useState, useEffect, useCallback } from "react";

import "./App.css";
import ReactLoading from "react-loading";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./pages/Home";
import LogIn from "./pages/LogIn";
import SignUp from "./pages/SignUp";
import JavaQuiz from "./pages/JavaQuiz";
import JavaScriptQuiz from "./pages/JavaScriptQuiz";
import PythonQuiz from "./pages/PythonQuiz";
import CppQuiz from "./pages/CppQuiz";
import NotFound from "./pages/NotFound";
import GuardedRoute from "./GaurdedRoute";
import { useDispatch, useSelector } from "react-redux";
import { setUserDetails } from "./features/user/userSlice";

import Profile from "./pages/Profile";
function App() {
  const [isAuthenticated, setisAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const verifyUser = useCallback(() => {
    fetch(
      "http://localhost:5000/api/user/refreshToken",
      { method: "POST", credentials: "include" } // could also try 'same-origin'
    )
      .then(async (response) => {
        if (response.status === 200) {
          const data = await response.json();

          let data1 = {
            name: user.name,
            token: data.token,
            userDetails: {},
          };
          dispatch(setUserDetails(data1));
          setisAuthenticated(true);
          setIsLoading(false);
        } else {
          let data1 = {
            name: "",
            token: "",
            userDetails: {},
          };
          dispatch(setUserDetails(data1));
          setisAuthenticated(false);
          setIsLoading(false);
        }
        // call refreshToken every 5 minutes to renew the authentication token.
        setTimeout(verifyUser, 5 * 60 * 1000);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [user.name, dispatch]);

  useEffect(() => {
    verifyUser();
    if (user.token !== "") {
      setisAuthenticated(true);
      setIsLoading(false);
    }
  }, [verifyUser]);

  useEffect(() => {
    fetch("http://localhost:5000/api/user/me", {
      method: "GET",
      credentials: "include",
      // Pass authentication token as bearer token in header
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    }).then(async (response) => {
      if (response.ok) {
        const data = await response.json();
        console.log("🚀 ~ file: App.js ~ line 77 ~ useEffect ~ data", data);
        let data1 = {
          name: user.name,
          token: user.token,
          userDetails: data,
        };
        dispatch(setUserDetails(data1));
        // setUserContext(oldValues => {
        //   return { ...oldValues, details: data }
        // })
      } else {
        if (response.status === 401) {
          // Edge case: when the token has expired.
          // This could happen if the refreshToken calls have failed due to network error or
          // User has had the tab open from previous day and tries to click on the Fetch button
          // window.location.reload();
        } else {
          // setUserContext(oldValues => {
          //   return { ...oldValues, details: null }
          // })
        }
      }
    });
  }, [user.token]);

  return (
    <div className="App">
      {isLoading ? (
        <ReactLoading
          id="loading"
          type="spin"
          color="#000000"
          height={100}
          width={100}
        />
      ) : (
        <Router>
          <Switch>
            <GuardedRoute
              exact
              path="/"
              component={Home}
              auth={isAuthenticated}
              loading={isLoading}
            />
            <Route exact path="/login" component={LogIn} />
            <Route exact path="/signup" component={SignUp} />

            <GuardedRoute
              exact
              path="/javaquiz"
              component={JavaQuiz}
              auth={isAuthenticated}
              loading={isLoading}
            />
            <GuardedRoute
              exact
              path="/cppquiz"
              component={CppQuiz}
              auth={isAuthenticated}
              loading={isLoading}
            />
            <GuardedRoute
              exact
              path="/javascriptquiz"
              component={JavaScriptQuiz}
              auth={isAuthenticated}
              loading={isLoading}
            />
            <GuardedRoute
              exact
              path="/pythonquiz"
              component={PythonQuiz}
              auth={isAuthenticated}
              loading={isLoading}
            />
            <GuardedRoute
              exact
              path="/profile"
              component={Profile}
              auth={isAuthenticated}
              loading={isLoading}
            />
            <Route component={NotFound} />
          </Switch>
        </Router>
      )}
    </div>
  );
}

export default App;
