import React from "react";
import { Route, Redirect } from "react-router-dom";

const GuardedRoute = ({ component: Component, auth, loading, ...rest }) => {
  console.log("auth:" + auth);
  return (
    <Route
      {...rest}
      render={(props) =>
        auth === true ? (
          <Component {...props} />
        ) : loading === false ? (
          <Redirect to="/login" />
        ) : (
          <></>
        )
      }
    />
  );
};

export default GuardedRoute;
