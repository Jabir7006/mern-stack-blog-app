import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../context/userContext";

const PrivateRoute = ({ children }) => {
  const { user, token } = useContext(UserContext);

  if (!user || !token) {
    return <Navigate to="/login" />;
  } else {
    return children;
  }
};

export default PrivateRoute;
