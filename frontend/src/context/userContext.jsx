import axios from "axios";
import React, { createContext, useEffect, useState } from "react";
import { baseURL } from "../../Api/api";
import LoadingSpinner from "../components/LoadingSpinner";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const storedToken = localStorage.getItem("token");
        const storedUser = localStorage.getItem("user");
        
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }

        if (storedToken) {
          setToken(storedToken);
  
          const response = await axios.get(`${baseURL}/api/users/profile`, {
            headers: {
              Authorization: `Bearer ${storedToken}`,
            },
          });

          if (response.status === 200) {
            setUser(response.data.payload.user);
            setIsLoggedIn(true);
          }
        }

        // Whether there's a token or not, set loading to false
        setLoading(false);
      } catch (error) {
        console.error("Error fetching user data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <UserContext.Provider
      value={{ user, setUser, isLoggedIn, setIsLoggedIn, token, setToken, search, setSearch }}
    >
      {children}
    </UserContext.Provider>
  );
};

