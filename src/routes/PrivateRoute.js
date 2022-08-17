import React from 'react';
import { Navigate, useLocation } from "react-router-dom";
import { isAuthenticated } from "../libraries/authUtils/isAuthenticated";
import { useAuthentication } from "../libraries/authUtils/useAuthentication";

function PrivateRoute({ children }) {
  const location = useLocation();
  useAuthentication();
  const auth = isAuthenticated()

  return auth ? children : <Navigate to="/login" />;
}

export default PrivateRoute;
