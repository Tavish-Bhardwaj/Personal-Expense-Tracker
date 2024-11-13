"use client"

import {createContext, useContext, useState, ReactNode} from "react";


type User={
    id: String;
    email: String;
    name: String;
}

type AuthContextType={
    user : User | null;
    login: (userData: User) => void;
    logout: ()=> void;


};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider =({children}: {children: ReactNode})=>{
    const [user, setUser]= useState<User | null>(null);

    const login = (userData: User) => setUser(userData);
    const logout = ()=>{
        setUser(null);
    }

    return (
        <AuthContext.Provider value={{user,login,logout}}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth =()=>{
    const context = useContext(AuthContext);
    if(!context){
        throw new Error("useContext must be used withiin an AuthProvider");
    }
    return context;
}