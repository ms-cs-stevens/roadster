import React, { useState, useEffect } from "react";
import firebase from "firebase/app";
import "firebase/auth";
import { firebaseConfig } from "../config";

const firebaseApp = firebase.initializeApp(firebaseConfig);

export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loadingUser, setLoadingUser] = useState(true);

  useEffect(() => {
    firebaseApp.auth().onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoadingUser(false);
    });
  }, []);

  if (loadingUser) {
    return <div>Loading....</div>;
  }

  return (
    <AuthContext.Provider value={{ currentUser }}>
      {children}
    </AuthContext.Provider>
  );
};
