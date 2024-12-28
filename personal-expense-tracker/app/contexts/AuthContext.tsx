
"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import axios from "axios";

type User = {
  id: string;
  email: string;
  name: string;
};

type AuthContextType = {
  errorMessage: string |null;
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  registerUser: (data: { name?: string; email: string; password: string }) => Promise<void>;
  
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const login = async(email: string, password: string) =>{
    try{
      setErrorMessage(null);
      
      const response = await axios.post('/api/user/v1/login', {email, password});
      const userData:User = response.data; 
      setUser(userData);

    }
    catch(error){
      console.error("Login Failed", error);
      throw new Error("Login failed. Please check your credentials");
    }
  } 
  
  const logout = () => setUser(null);

  const registerUser = async (data: { name?: string; email: string; password: string }) => {
    if(!data.name){
      throw new Error("Name is required for Registration");
    }
    await axios.post('/api/user/v1/register', data);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, registerUser, errorMessage }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};
