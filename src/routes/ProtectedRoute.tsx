import { Navigate, useLocation } from "react-router-dom";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();

  if (false) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};
export default ProtectedRoute;
