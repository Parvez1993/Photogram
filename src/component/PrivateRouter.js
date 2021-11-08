import React from "react";

import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "./Context";

function PrivateRoute() {
  const { user } = useAuth();

  return user ? <Outlet /> : <Navigate to="/signin" />;
}

export default PrivateRoute;
