import React, { useState, useEffect } from "react";

import "./App.css";
import ReactLoading from "react-loading";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./components/Home";
import LogIn from "./components/LogIn";
import SignUp from "./components/SignUp";
import JavaQuiz from "./components/Java/JavaQuiz";
import JavaScriptQuiz from "./components/JavaScript/JavaScriptQuiz";
import PythonQuiz from "./components/Python/PythonQuiz";
import CppQuiz from "./components/Cpp/CppQuiz";
import firebase from "./components/firebase";
import GuardedRoute from "./GaurdedRoute";
import { useDispatch } from "react-redux";
import { setUserDetails } from "./features/user/userSlice";
import Profile from "./components/Profile";
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
          user_id: user.uid,
          email: user.email,
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
