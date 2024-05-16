import React, {createContext, useState, useEffect, useContext} from 'react';

const AuthContext = createContext();

export const AuthProvider = ({children}) => {
  const [token, setToken] = useState(null);
  const [userData, setUserData] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const login = async newToken => {
    try {
      setToken(newToken);

      setIsLoggedIn(true);
    } catch (error) {
      console.error('Error saving user data:', error);
    }
  };

  const logout = async () => {
    try {
      setToken(null);
      setUserData(null);
      setIsLoggedIn(false);
    } catch (error) {
      console.error('Error removing user data:', error);
    }
  };

  // Provide a default value for cartData if it's null or undefined
  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        token,
        userData,
        login,
        logout,
      }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
