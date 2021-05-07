import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../firebase/Auth";
import { Redirect } from "react-router-dom";
import PasswordReset from "./PasswordReset";
import apiService from "../../services/apiService";
import {apiUrl} from "../../config";

function Account() {
  const { currentUser } = useContext(AuthContext);
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function fetchUser() {
      if(currentUser) {
        const user = await apiService.getResource(`${apiUrl}/users/${currentUser.uid}`)
        setUser(user);
      }
    }
    fetchUser();
  }, [currentUser]);

  if (!currentUser) {
    return <Redirect to="/login" />;
  }

  return (
    <div>
      <p>{user && user.email}</p>
      <p>{user && user.firstName}</p>
      <p>{user && user.lastName}</p>
      <PasswordReset />
    </div>
  );
}

export default Account;
