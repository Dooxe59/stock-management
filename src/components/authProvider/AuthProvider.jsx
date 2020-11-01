import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import app from "../../firebase.js";

export const AuthContext = React.createContext();

const AuthProvider = ({children}) => {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    app.auth().onAuthStateChanged(setCurrentUser);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        currentUser
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;