import React from "react";
import PropTypes from "prop-types";
import { Route, Redirect } from "react-router-dom";
import Layout from "../components/layout/Layout";

export const PrivateRoute = ({
  isAuthenticated,
  component: Component,
  ...rest
}) => {
  console.log(isAuthenticated, "PROJECTS");
  return (
    <Layout>
      <Route
        {...rest}
        component={(props) =>
          isAuthenticated ? <Component {...props} /> : <Redirect to="/login" />
        }
      />
    </Layout>
  );
};

PrivateRoute.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  component: PropTypes.func.isRequired,
};
