import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import Signout from "./user/SignOut";
import { Button } from "@material-ui/core";
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
      <Button color="inherit">
        <NavLink
          exact
          activeClassName="active"
          className="App-link"
          to="/journeys/new"
        >
          Plan your Trip
        </NavLink>
      </Button>
      <Button color="inherit">
        <NavLink
          exact
          to="/account"
          className="App-link"
          activeClassName="active"
        >
          Account
        </NavLink>
      </Button>
      <Button color="inherit">
        <NavLink
          exact
          to="/account"
          className="App-link"
          activeClassName="active"
        >
          Upcoming Journeys
        </NavLink>
      </Button>
      <Signout />
    </>
  );
};

const NonAuthenticated = () => {
  return (
    <>
      <Button color="inherit">
        <NavLink
          exact
          activeClassName="active"
          className="App-link"
          to="/login"
        >
          Login
        </NavLink>
      </Button>
      <Button color="inherit">
        <NavLink
          exact
          activeClassName="active"
          className="App-link"
          to="/register"
        >
          Sign Up
        </NavLink>
      </Button>
    </>
  );
};

export default Navigation;
