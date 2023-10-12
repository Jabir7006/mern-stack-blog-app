import axios from "axios";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { UserContext } from "../context/userContext";

const useLogin = () => {
  const { setUser, setToken, setIsLoggedIn } = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (inputs) => {
    try {
      setLoading(true);

      const response = await axios.post("http://localhost:3000/api/users/login", { ...inputs });

      if (response.status === 200) {
        const { user, token } = response.data.payload;
        toast.success(response.data.message);
        localStorage.setItem("user", JSON.stringify({ user }));
        localStorage.setItem("token", token);
        setLoading(false);
        setIsLoggedIn(true);
        setToken(token);
        setUser(user);
        navigate("/");
      }

      console.log(response);
    } catch (error) {
      setIsLoggedIn(false);
      setLoading(false);
      setToken(null);
      setUser(null);
      console.log(error.response);
      toast.error(error.response.data.message);
    }
  };

  const loadingSpinner = (
    <div className="flex items-center justify-center h-screen">
      <div className="relative">
        <div className="h-24 w-24 rounded-full border-t-8 border-b-8 border-gray-200" />
        <div className="absolute top-0 left-0 h-24 w-24 rounded-full border-t-8 border-b-8 border-blue-500 animate-spin"></div>
      </div>
    </div>
  );

  return { loading, setLoading, handleLogin, loadingSpinner };
};

export default useLogin;
