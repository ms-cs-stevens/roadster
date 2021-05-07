import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import Signout from "./user/SignOut";
import { AuthContext } from "../firebase/Auth";

const Navigation = () => {
  const { currentUser } = useContext(AuthContext);
  return (
    <header className="App-header">
      Roadster
      {currentUser ? <Authenticated /> : <NonAuthenticated />}
    </header>
  );
};

const Authenticated = () => {
  return (
    <>
      <NavLink
        exact
        activeClassName="active"
        className="App-link"
        to="/journeys/new"
      >
        Plan your Trip
      </NavLink>
      <NavLink
        exact
        to="/account"
        className="App-link"
        activeClassName="active"
      >
        Account
      </NavLink>
      <Signout />
    </>
  );
};

const NonAuthenticated = () => {
  return (
    <>
      <NavLink exact activeClassName="active" className="App-link" to="/login">
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
  );
};

export default Navigation;
