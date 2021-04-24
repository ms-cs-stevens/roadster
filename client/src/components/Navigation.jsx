import React, { useContext } from "react";
import Signout from "./user/SignOut";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../firebase/Auth";

const Navigation = () => {
  const { currentUser } = useContext(AuthContext);

  return (
    <header className="App-header">
      Roadster
      <NavLink exact activeClassName="active" className="App-link" to="/">
        Home
      </NavLink>
      {currentUser ? (
        <Signout />
      ) : (
        <>
          <NavLink
            exact
            activeClassName="active"
            className="App-link"
            to="/login"
          >
            Login
          </NavLink>
          <NavLink
            exact
            activeClassName="active"
            className="App-link"
            to="/register"
          >
            Sign Up
          </NavLink>
        </>
      )}
    </header>
  );
};

export default Navigation;
