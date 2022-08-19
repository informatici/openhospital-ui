import { Navigate, useLocation, Outlet } from "react-router-dom";
import { isAuthenticated } from "../libraries/authUtils/isAuthenticated";
import { useAuthentication } from "../libraries/authUtils/useAuthentication";

const PrivateOutlet = () => {
  useAuthentication();
  const { pathname } = useLocation();
  console.log({ pathname });

  return isAuthenticated ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: pathname }} replace />
  );
};

export default PrivateOutlet;
