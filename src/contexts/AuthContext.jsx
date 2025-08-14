import React, { createContext, useState, useEffect } from "react";
import SecureStorage from "react-secure-storage";
import { AUTH_KEY } from "../utils/constans"; // Pastikan path ini benar

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({ token: null, username: null });

  // Load data dari SecureStorage saat app mount
  useEffect(() => {
    const storedData = SecureStorage.getItem(AUTH_KEY);
    if (storedData) {
      setAuth(JSON.parse(storedData));
    }
  }, []);

  // Fungsi untuk update auth (digunakan di Login dan Logout)
  const login = (data) => {
    SecureStorage.setItem(AUTH_KEY, JSON.stringify(data));
    setAuth(data);
  };

  const logout = () => {
    SecureStorage.removeItem(AUTH_KEY);
    setAuth({ token: null, username: null });
  };

  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
