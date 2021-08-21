import React from "react";
import { useSelector } from "react-redux";
import { Route, Redirect } from "react-router-dom";
import { selectUser } from "../redux/appSlice";

const DynamicRoute = (props) => {
     const user = useSelector(selectUser);

     // guest and no user - <Login />
     // *guest and user - <Home />
     // authenticated and user - <Home />
     // *authenticated and no user - <Login />

     if (props.authenticated && !user) {
          return <Redirect to="/login" />;
     } else if (props.guest && user) {
          return <Redirect to="/" />;
     } else {
          return <Route component={props.component} {...props} />;
     }
};

export default DynamicRoute;
