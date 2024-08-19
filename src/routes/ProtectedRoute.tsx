import { Navigate, useLocation } from "react-router-dom";
import useUser from "../hooks/useUser";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const user = useUser();

  if (!user?.user) {
    return <Navigate to={"sign_in"} state={{ from: location }} replace />;
  }

  return children;
};
export default ProtectedRoute;
