import axios from "axios";
import React, { createContext, useEffect, useState } from "react";
import { baseURL } from "../../Api/api";

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

  const loadingSpinner = (
    <div className="flex items-center justify-center h-screen">
      <div className="relative">
        <div className="h-24 w-24 rounded-full border-t-8 border-b-8 border-gray-200" />
        <div className="absolute top-0 left-0 h-24 w-24 rounded-full border-t-8 border-b-8 border-blue-500 animate-spin"></div>
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-white z-[9999]">
        {loadingSpinner}
      </div>
    );
  }

  return (
    <UserContext.Provider
      value={{ user, setUser, isLoggedIn, setIsLoggedIn, token, setToken, search, setSearch }}
    >
      {children}
    </UserContext.Provider>
  );
};
