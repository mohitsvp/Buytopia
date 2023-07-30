import React, { createContext, useContext, useEffect, useState } from 'react'

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

const AuthProvider = ({children}) => {
    const [token, setToken] = useState(null);

    const login = (token) => {
        setToken(token);
        localStorage.setItem("token", token);
    }

    useEffect(() => {
        setToken(localStorage.getItem("token"));
    }, [])


    const logout = () => {
        setToken(null);
        localStorage.removeItem("token");
    }


  return (
    <AuthContext.Provider value={{token, login, logout}}>
        {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider