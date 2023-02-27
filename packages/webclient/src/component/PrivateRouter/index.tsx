import React from "react";
import { Route, Navigate, RouteProps } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const PrivateRoute: React.FC<RouteProps> = ({ path, element, ...rest }) => {
  const isAuthenticated = useAuth();
  return (
    <Route
      path={path}
      element={isAuthenticated ? element : <Navigate to="/login" replace />}
    />
  );
};

export default PrivateRoute;
