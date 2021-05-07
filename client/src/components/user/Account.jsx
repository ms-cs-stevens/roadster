import React, { useContext } from "react";
import { AuthContext } from "../../firebase/Auth";
import { Redirect } from "react-router-dom";
// import '../App.css';
import PasswordReset from "./PasswordReset";

function Account() {
  const { currentUser } = useContext(AuthContext);

  if (!currentUser) {
    return <Redirect to="/login" />;
  }
  return (
    <div>
      <PasswordReset />
    </div>
  );
}

export default Account;
