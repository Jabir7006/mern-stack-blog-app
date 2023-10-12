import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { UserContext } from "../context/userContext";

const ActivateAccount = () => {
  const { setToken, setUser } = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const { token } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const handleActivateUser = async () => {
      console.log(token);
      try {
        setLoading(true);

        const response = await axios.post(`http://localhost:3000/api/users/activate/${token}`);
        console.log(response);
        if (response.status === 201) {
          const { user, token, message } = response.data.payload;
          localStorage.setItem("user", JSON.stringify({ user }));
          localStorage.setItem("token", token);

          setLoading(false);
          toast.success(message);
          setToken(token);
          setUser(user);
          navigate("/");
        }
      } catch (error) {
        setLoading(false);
        setToken(null);
        setUser(null);
        toast.error(error.response.data.message);
      }
    };

    handleActivateUser();
  }, [token, setToken, setUser, setLoading]);

  return <div>activating...</div>;
};

export default ActivateAccount;
