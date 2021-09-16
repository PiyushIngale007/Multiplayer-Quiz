import React, { useState, useEffect } from "react";

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
import firebase from "./utils/firebase";
import GuardedRoute from "./GaurdedRoute";
import { useDispatch } from "react-redux";
import { setUserDetails } from "./features/user/userSlice";
import Profile from "./pages/Profile";
function App() {
  const [isAuthenticated, setisAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const dispatch = useDispatch();

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setisAuthenticated(true);
        let data = {
          name: user.displayName,
          email: user.email,
          userID: user.uid,
        };

        dispatch(setUserDetails(data));
      }
      setIsLoading(false);
    });
    return () => {
      console.log("cleanup");
    };
  }, [dispatch]);

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
          </Switch>
        </Router>
      )}
    </div>
  );
}

export default App;
