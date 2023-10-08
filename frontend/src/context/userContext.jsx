import React, { createContext, useEffect, useState } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState(null);
  


  useEffect(() => {
    try {
      const data = JSON.parse(localStorage.getItem("data"));

      if (data) {
        setUser(data.user);
        setIsLoggedIn(true);
        setToken(data.token);
      }
    } catch (error) {
      // Handle error, e.g., clear invalid data from localStorage
      console.error("Error parsing user data from localStorage:", error);
      localStorage.removeItem("data");
    }
    
    return () => {
      // Clean up the context state when the component unmounts
      setUser(null);
      setIsLoggedIn(false);
      setToken(null);
    };
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, isLoggedIn, setIsLoggedIn, token, setToken }}>
      {children}
    </UserContext.Provider>
  );
};
