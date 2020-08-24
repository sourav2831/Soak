import React from "react";
import { Route, Redirect } from "react-router-dom";
import { isAuth } from "../../util/AuthCheck";

const PrivateRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        isAuth() ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  );
};

export default PrivateRoute;