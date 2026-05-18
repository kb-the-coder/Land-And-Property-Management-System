import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const userContext = createContext();
const AuthContext = ({ children }) => {
  const API_URL = "http://localhost:3400/api/user";
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verifyUsers = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setUser(null);
          return;
        }
        const res = await axios.get(`${API_URL}/verify`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!res.data.success) {
          alert(res.data.message);
        }
        setUser(res.data.user);
      } catch (error) {
        alert(error.message);
      } finally {
        setLoading(false);
      }
    };
    verifyUsers();
  }, []);
  if (loading) {
    return;
  }
  const login = (user) => {
    setUser(user);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("token");
  };

  return (
    <userContext.Provider value={{ user, login, logout }}>
      {children}
    </userContext.Provider>   
  );
};
export const userAuth = () => useContext(userContext);

export default AuthContext;
