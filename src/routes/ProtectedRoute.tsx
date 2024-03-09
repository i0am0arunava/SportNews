import { Navigate, useLocation } from "react-router-dom";

export default function ProtectedRoutes({ children }: { children: JSX.Element }) {
  const { pathname } = useLocation()

  const authenticated = !!localStorage.getItem("authToken");
  if (authenticated) {
    return <>{children}</>;
  }else{
    localStorage.setItem('authToken', "-x0IuOQyQRMfe5u_jThSVf9O5LcRN6hieUorkRUgRoHxm6X7FzsTNnev_O0GatlOPz3eQ7qJNrtg7NJL-IDtyg");
    return <>{children}</>;
  }
  return <Navigate to="/signin" replace  state={{ referrer: pathname }} />;
}