// import packages
import { useEffect } from "react";
import { useNavigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const navigate = useNavigate();
  const authToken = sessionStorage.getItem("oktoAuthToken");

  useEffect(() => {
    if (!authToken) {
      return navigate("/", { replace: true });
    }
  }, [authToken, navigate]);

  return (
      <Outlet />
  );
};

export default ProtectedRoute;