import React, { createContext, useState } from 'react';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({
    username: null,
    access: null,
    refresh: null,
  });

  const login = ({ username, access, refresh }) => {
    setAuthState({ username, access, refresh });
  };

  const logout = () => {
    setAuthState({ username: null, access: null, refresh: null });
  };

  return (
    <AuthContext.Provider value={{ ...authState, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
